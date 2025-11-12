export interface SimpleParse {
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
}

export interface RelatorioJogo{
  kills_by_means: Record<string, number>;
  general_ranking: Record<string, number>;
  killed_by_world: Record<string, number>
}
