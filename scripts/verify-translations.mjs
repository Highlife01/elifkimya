import fs from 'node:fs';
import { REVIEWED_TRANSLATIONS } from '../src/data/reviewed-translations.js';
import { protectedTokens } from './translation-integrity.mjs';

const sources = JSON.parse(fs.readFileSync('src/data/translation-source.json', 'utf8'));
const codes = ['en', 'ar', 'de', 'fr', 'ru', 'es', 'it', 'zh', 'fa'];
const failures = [];
for (const code of codes) {
  const catalog = JSON.parse(fs.readFileSync(`src/data/translations/${code}.json`, 'utf8'));
  for (const source of sources) {
    const text = REVIEWED_TRANSLATIONS[source]?.[code] || catalog[source];
    if (typeof text !== 'string' || !text.trim()) {
      failures.push(`${code}: missing ${source.slice(0, 100)}`);
      continue;
    }
    if (/\uFFFD|ZXBRAND\d+XZ|\uE000/u.test(text)) failures.push(`${code}: corrupt value ${source.slice(0, 100)}`);
    for (const brand of protectedTokens(source)) {
      if (!text.includes(brand)) failures.push(`${code}: changed ${brand} in ${source.slice(0, 100)}`);
    }
  }
  console.log(`${code}: ${sources.length} public source strings checked`);
}
if (failures.length) {
  console.error(failures.slice(0, 40).join('\n'));
  throw new Error(`${failures.length} translation integrity errors. Run translations:generate to repair missing entries.`);
}
console.log(`Translation integrity passed: ${sources.length} strings × ${codes.length} translated languages.`);
