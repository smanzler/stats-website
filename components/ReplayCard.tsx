import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface PlayerStats {
  player_name: string;
  platform: string;
  online_id: string;
  team: number;
  score: number;
  goals: number;
  assists: number;
  saves: number;
  shots: number;
}

interface ReplayProps {
  id: string;
  date: string;
  blue_score: number;
  orange_score: number;
  map: string;
  duration: number;
  match_type: string;
  team_size: number;
  player_stats: PlayerStats[];
}

export function ReplayCard({ replay }: { replay: ReplayProps }) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const blueTeam = replay.player_stats.filter((player) => player.team === 0);
  const orangeTeam = replay.player_stats.filter((player) => player.team === 1);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl">{replay.map}</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <CardDescription className="text-sm">
              {formatDistanceToNow(new Date(replay.date))} ago •{" "}
              {formatDuration(replay.duration)}
            </CardDescription>
            <Badge variant="outline" className="shrink-0">
              {replay.match_type} {replay.team_size}v{replay.team_size}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex items-center gap-4 justify-center lg:min-w-[200px]">
            <div className="text-3xl font-bold text-blue-500">
              {replay.blue_score || 0}
            </div>
            <div className="text-sm text-muted-foreground">vs</div>
            <div className="text-3xl font-bold text-orange-500">
              {replay.orange_score || 0}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 flex-1">
            <div>
              <h4 className="text-sm font-semibold text-blue-500 mb-3">
                BLUE TEAM
              </h4>
              <div className="space-y-2">
                {blueTeam.map((player) => (
                  <div
                    key={player.online_id}
                    className="grid grid-cols-[1fr,auto] gap-4 text-sm"
                  >
                    <span className="truncate">{player.player_name}</span>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="hidden lg:flex gap-2 items-center min-w-[64px]">
                        <span className="font-medium">{player.score}</span>
                        <span className="text-xs">PTS</span>
                      </div>
                      <div className="flex gap-4 text-nowrap">
                        <span>{player.goals} G</span>
                        <span>{player.assists} A</span>
                        <span>{player.saves} S</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-orange-500 mb-3">
                ORANGE TEAM
              </h4>
              <div className="space-y-2">
                {orangeTeam.map((player) => (
                  <div
                    key={player.online_id}
                    className="grid grid-cols-[1fr,auto] gap-4 text-sm"
                  >
                    <span className="truncate">{player.player_name}</span>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="hidden lg:flex gap-2 items-center min-w-[64px]">
                        <span className="font-medium">{player.score}</span>
                        <span className="text-xs">PTS</span>
                      </div>
                      <div className="flex gap-4 text-nowrap">
                        <span>{player.goals} G</span>
                        <span>{player.assists} A</span>
                        <span>{player.saves} S</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
