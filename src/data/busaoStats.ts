/**
 * Números consolidados das planilhas de atendimento do Busão da Castração
 * (eventos de 17/06/2026 a 03/10/2026). Contém apenas totais agregados:
 * nenhum dado pessoal de tutores ou pets deve ser publicado aqui.
 */

export interface BusaoTotals {
  pets: number;
  cats: number;
  dogs: number;
  females: number;
  tutors: number;
  /** Cidades onde o Busão foi instalado; cada polo também recebeu tutores de municípios vizinhos. */
  hubCities: number;
  actions: number;
}

export const BUSAO_TOTALS: BusaoTotals = {
  pets: 18241,
  cats: 12228,
  dogs: 6013,
  females: 10825,
  tutors: 11891,
  hubCities: 19,
  actions: 27,
};

export const BUSAO_PERIOD = 'de junho a outubro de 2026';

export interface CityStat {
  name: string;
  pets: number;
}

export const BUSAO_HUB_CITIES: CityStat[] = [
  { name: 'Teresina', pets: 6294 },
  { name: 'Picos', pets: 2994 },
  { name: 'Parnaíba', pets: 1595 },
  { name: 'Piripiri', pets: 1392 },
  { name: 'Campo Maior', pets: 1143 },
  { name: 'Altos', pets: 517 },
  { name: 'Luís Correia', pets: 451 },
  { name: 'União', pets: 451 },
  { name: 'Cocal', pets: 416 },
  { name: 'Pedro II', pets: 410 },
  { name: 'Floriano', pets: 401 },
  { name: 'Castelo do Piauí', pets: 316 },
  { name: 'Esperantina', pets: 315 },
  { name: 'Corrente', pets: 302 },
  { name: 'Demerval Lobão', pets: 301 },
  { name: 'Oeiras', pets: 292 },
  { name: 'São João do Piauí', pets: 266 },
  { name: 'Uruçuí', pets: 235 },
  { name: 'Regeneração', pets: 150 },
];

export interface AreaStat {
  name: string;
  pets: number;
  actions: number;
}

/** Ações em bairros somadas à zona: Mafrense → Norte; Pedra Mole e Vale Quem Tem → Leste; Promorar → Sul. */
export const TERESINA_AREAS: AreaStat[] = [
  { name: 'Zona Norte', pets: 2152, actions: 3 },
  { name: 'Zona Leste', pets: 1914, actions: 3 },
  { name: 'Zona Sul', pets: 1392, actions: 2 },
  { name: 'Zona Sudeste', pets: 836, actions: 1 },
];

export const TERESINA_TOTALS = {
  pets: 6294,
  actions: 9,
} as const;
