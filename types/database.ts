export type Replay = {
  id: string;
  uploaded_by: string;
  date: string;
  blue_score: number;
  orange_score: number;
  map: string;
  duration: number;
  match_type: string;
  team_size: number;
};

export type PlayerStats = {
  id: string;
  replay_id: string;
  player_name: string;
  platform: string;
  online_id: string;
  team: number;
  score: number;
  goals: number;
  assists: number;
  saves: number;
  shots: number;
};

export type ReplayWithPlayerStats = Replay & {
  player_stats: PlayerStats[];
};
