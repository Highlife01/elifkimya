/** Explicit maintenance command. Only tracked public copy is sent for translation. */
import fs from 'node:fs';
import path from 'node:path';
import { REVIEWED_TRANSLATIONS } from '../src/data/reviewed-translations.js';
import { protectedTokens, protectSource } from './translation-integrity.mjs';

const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'src/data/translation-source.json'), 'utf8'));
const sources = Array.isArray(inventory) ? inventory : inventory.sources;
if (!Array.isArray(sources) || sources.some((source) => typeof source !== 'string')) {
  throw new Error('Translation inventory must be an array of public source strings.');
}
const repairBrands = process.argv.includes('--repair-brands');
const languageArgs = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
const languages = languageArgs.length ? languageArgs : ['en', 'ar', 'de', 'fr', 'ru', 'es', 'it', 'zh', 'fa'];
if (languages.some((code) => !['en', 'ar', 'de', 'fr', 'ru', 'es', 'it', 'zh', 'fa'].includes(code))) {
  throw new Error('Unsupported translation language.');
}
const directory = path.join(root, 'src/data/translations');
fs.mkdirSync(directory, { recursive: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let completed = 0;
const fileQueues = new Map();

function persistCatalog(file, catalog) {
  const pending = (fileQueues.get(file) || Promise.resolve()).then(async () => {
    for (let attempt = 0; ; attempt += 1) {
      try {
        const temporary = `${file}.tmp`;
        fs.writeFileSync(temporary, `${JSON.stringify(catalog, null, 2)}\n`);
        fs.renameSync(temporary, file);
        return;
      } catch (error) {
        if (attempt >= 10) throw error;
        await delay(Math.min(250 * (attempt + 1), 2000));
      }
    }
  });
  fileQueues.set(file, pending);
  return pending;
}

async function requestTranslations(code, batch) {
  const url = new URL('https://clients5.google.com/translate_a/t');
  url.searchParams.set('client', 'dict-chrome-ex');
  url.searchParams.set('sl', 'tr');
  url.searchParams.set('tl', code === 'zh' ? 'zh-CN' : code);
  url.searchParams.set('format', 'html');
  const body = new URLSearchParams();
  const protectedBrands = batch.map(() => []);
  batch.forEach((source, index) => {
    const protectedSource = protectSource(source);
    protectedBrands[index] = protectedSource.protectedValues;
    body.append('q', protectedSource.text);
  });
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const response = await fetch(url, { method: 'POST', body, signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error(`Translation HTTP ${response.status}`);
      const result = await response.json();
      if (!Array.isArray(result) || result.length !== batch.length || result.some((value) => typeof value !== 'string' || !value.trim())) {
        throw new Error('Translation response does not match the source batch.');
      }
      return result.map((value, index) => {
        value = value.replace(/<\/?span\b[^>]*>/giu, '').replace(/&(amp|lt|gt|quot|#39);/gu, (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[entity]);
        for (const token of protectedBrands[index]) {
          if (!value.includes(token)) throw new Error(`Protected value ${token} was changed for ${code}: ${JSON.stringify({ source: batch[index], translated: value })}`);
        }
        return value.replace(/\s+/g, ' ').trim();
      });
    } catch (error) {
      if (attempt === 4) throw error;
      await delay(1500 * (attempt + 1));
    }
  }
}

const jobs = [];
for (const code of languages) {
  const file = path.join(directory, `${code}.json`);
  const catalog = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  for (const source of sources) {
    if (REVIEWED_TRANSLATIONS[source]?.[code]) catalog[source] = REVIEWED_TRANSLATIONS[source][code];
  }
  await persistCatalog(file, catalog);
  const missing = sources.filter((source) => !REVIEWED_TRANSLATIONS[source]?.[code] &&
    (!catalog[source] || (repairBrands && /Elif|ELİF/u.test(source)) ||
      protectedTokens(source).some((token) => !catalog[source].includes(token))));
  let batch = [];
  let length = 0;
  for (const source of missing) {
    const encodedLength = encodeURIComponent(source).length;
    if (batch.length && (batch.length >= 35 || length + encodedLength > 10000)) {
      jobs.push({ code, batch, catalog, file });
      batch = [];
      length = 0;
    }
    batch.push(source);
    length += encodedLength + 3;
  }
  if (batch.length) jobs.push({ code, batch, catalog, file });
}
console.log(`Public translations: ${sources.length} source strings, ${jobs.length} batches across ${languages.length} languages.`);

async function worker() {
  for (;;) {
    const job = jobs.shift();
    if (!job) return;
    const translated = await requestTranslations(job.code, job.batch);
    job.batch.forEach((source, index) => { job.catalog[source] = translated[index]; });
    // Persist each completed batch so retries can resume without another request.
    await persistCatalog(job.file, job.catalog);
    completed += job.batch.length;
    if (completed % 200 < job.batch.length || jobs.length < 3) console.log(`${job.code}: ${Object.keys(job.catalog).length}/${sources.length} (${completed} translations this run)`);
    await delay(125);
  }
}
await Promise.all([worker(), worker(), worker()]);
