export interface BaseStats {
  totalConfirmedCases: number;
  currentConfirmedCases: number;
  newlyConfirmedCases: number;
  netNewlyConfirmedCases: number;
  totalDeaths: number;
  newDeaths: number;
  totalRecoveredCases: number;
  newlyRecoveredCases: number;
  lastUpdatedDate: string;
}

export interface Stats extends BaseStats {
  history: StatsHistory[];
}

export type ParentStats = Stats & {
  [key: string]: Stats;
};

export interface StatsHistory extends BaseStats {
  date: string;
  lastUpdatedDate: string;
}

export type Metrics =
  | 'totalConfirmedCases'
  | 'newlyConfirmedCases'
  | 'totalDeaths'
  | 'newDeaths'
  | 'totalRecoveredCases'
  | 'newlyRecoveredCases'
  | 'currentConfirmedCases'
  | 'netNewlyConfirmedCases';
