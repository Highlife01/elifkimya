/** Chemical identifiers and dimensional units must survive translation exactly. */
const terms = [
  'A-PAM', 'C-PAM', 'LC-MS', 'ICP-OES', 'CMIT/MIT', 'MΩ·cm', 'MΩ.cm',
  'µS/cm', 'μS/cm', 'g/cm³', 'kg/L', 'mg/L', 'mL', 'm³', 'Sm³', '°C',
  'H₂SO₄', 'H2SO4', 'CaCO₃', 'CaCO3', 'Na₂CO₃', 'Na2CO3', 'FeCl₃', 'FeCl3',
  'NaOH', 'NaOCl', 'HCl', 'SO₃', 'SO3', 'DBNPA', 'PBTC', 'HEDP', 'EDTA',
  'PolyDADMAC', 'DADMAC', 'SLES', 'LABSA', 'MBAS', 'BZT', 'PAM', 'PAC',
  'RO', 'EDI', 'UF', 'SDS', 'GBF', 'TDS', 'COA', 'LSI', 'SDI', 'pH',
  'HPLC', 'UPLC', 'GFAA', 'ASTM', 'PCR', 'DNA', 'PCB', 'CPU', 'AISI',
  'EUR', 'USD', 'TRY', 'IBC', 'ADR', 'ISO'
];
const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length);
const technicalPattern = new RegExp(`(?<![\\p{L}\\p{N}])(?:${escaped.join('|')})(?![\\p{L}\\p{N}])`, 'gu');
const brandPattern = /(?:Elif Çevre ve Endüstriyel Kimya|Elif Çevre Kimya|ELİF ÇEVRE KİMYA|Elif Kimya|ELİF KİMYA|\b[A-Z]{2,3}-\d{3,5}\b)/gu;

export function protectedTokens(source) {
  return [...new Set([...source.matchAll(brandPattern), ...source.matchAll(technicalPattern)].map(([value]) => value))];
}

export function protectSource(source) {
  const protectedValues = protectedTokens(source);
  const combined = new RegExp(`${brandPattern.source}|${technicalPattern.source}`, 'gu');
  const text = source.replace(combined, (value) => `<span class=notranslate translate=no>${value}</span>`);
  return { text, protectedValues };
}
