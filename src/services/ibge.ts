const PIAUI_CITIES_URL =
  'https://servicodados.ibge.gov.br/api/v1/localidades/estados/22/municipios?orderBy=nome';

interface NamedItem {
  nome: string;
}

function isNamedItem(value: unknown): value is NamedItem {
  return typeof value === 'object' && value !== null && typeof (value as { nome?: unknown }).nome === 'string';
}

export async function fetchPiauiCities(signal?: AbortSignal): Promise<string[]> {
  const response = await fetch(PIAUI_CITIES_URL, { signal });
  if (!response.ok) throw new Error(`IBGE respondeu ${response.status}`);

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error('Resposta inesperada do IBGE');

  return data.filter(isNamedItem).map((item) => item.nome);
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function findCity(cities: string[], query: string): string | undefined {
  const target = normalizeText(query);
  return cities.find((city) => normalizeText(city) === target);
}
