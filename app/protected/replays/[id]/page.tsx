import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface ReplayDetails {
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

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description?: string;
}) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="text-xs mt-1">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}

function TeamTable({
  players,
  teamName,
  teamColor,
}: {
  players: PlayerStats[];
  teamName: string;
  teamColor: string;
}) {
  const totalStats = players.reduce(
    (acc, player) => ({
      score: acc.score + player.score,
      goals: acc.goals + player.goals,
      assists: acc.assists + player.assists,
      saves: acc.saves + player.saves,
      shots: acc.shots + player.shots,
    }),
    { score: 0, goals: 0, assists: 0, saves: 0, shots: 0 }
  );

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className={`text-lg ${teamColor}`}>{teamName}</CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Total Score: {totalStats.score}</span>
          <span>•</span>
          <span>Shots: {totalStats.shots}</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Goals</TableHead>
              <TableHead className="text-right">Assists</TableHead>
              <TableHead className="text-right">Saves</TableHead>
              <TableHead className="text-right">Shots</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.online_id}>
                <TableCell className="font-medium">
                  {player.player_name}
                </TableCell>
                <TableCell className="text-right">{player.score}</TableCell>
                <TableCell className="text-right">{player.goals}</TableCell>
                <TableCell className="text-right">{player.assists}</TableCell>
                <TableCell className="text-right">{player.saves}</TableCell>
                <TableCell className="text-right">{player.shots}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

async function getReplayDetails(id: string): Promise<ReplayDetails | null> {
  const supabase = await createClient();

  // Fetch replay details
  const { data: replay, error: replayError } = await supabase
    .from("replays")
    .select("*")
    .eq("id", id)
    .single();

  if (replayError || !replay) {
    return null;
  }

  // Fetch player stats
  const { data: playerStats, error: statsError } = await supabase
    .from("player_stats")
    .select("*")
    .eq("replay_id", id);

  if (statsError) {
    return null;
  }

  return {
    ...replay,
    player_stats: playerStats || [],
  };
}

export default async function ReplayDetails({
  params,
}: {
  params: { id: string };
}) {
  const replay = await getReplayDetails(params.id);

  if (!replay) {
    notFound();
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(2).toString().padStart(2, "0")}`;
  };

  const blueTeam = replay.player_stats.filter((player) => player.team === 0);
  const orangeTeam = replay.player_stats.filter((player) => player.team === 1);

  const totalShots = replay.player_stats.reduce(
    (acc, player) => acc + player.shots,
    0
  );
  const totalGoals = replay.player_stats.reduce(
    (acc, player) => acc + player.goals,
    0
  );
  const shotAccuracy =
    totalShots > 0 ? ((totalGoals / totalShots) * 100).toFixed(1) : "0";

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{replay.map}</h1>
            <p className="text-muted-foreground">
              {formatDistanceToNow(new Date(replay.date))} ago
            </p>
          </div>
          <Badge variant="outline" className="text-base px-4 py-1">
            {replay.match_type} {replay.team_size}v{replay.team_size}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Duration" value={formatDuration(replay.duration)} />
          <StatCard
            title="Final Score"
            value={`${replay.blue_score || 0} - ${replay.orange_score || 0}`}
            description={`${Math.abs(replay.blue_score - replay.orange_score)} goal difference`}
          />
          <StatCard
            title="Shot Accuracy"
            value={`${shotAccuracy}%`}
            description={`${totalGoals} goals from ${totalShots} shots`}
          />
          <StatCard
            title="Total Players"
            value={replay.player_stats.length}
            description={`${replay.team_size}v${replay.team_size} match`}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <TeamTable
          players={blueTeam}
          teamName="BLUE TEAM"
          teamColor="text-blue-500"
        />
        <TeamTable
          players={orangeTeam}
          teamName="ORANGE TEAM"
          teamColor="text-orange-500"
        />
      </div>
    </div>
  );
}
