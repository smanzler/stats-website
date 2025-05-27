import { createClient } from "@/utils/supabase/server";
import { ReplayCard } from "@/components/ReplayCard";

async function getReplaysWithPlayerStats() {
  const supabase = await createClient();

  // Fetch replays
  const { data: replays, error: replaysError } = await supabase
    .from("replays")
    .select("*")
    .order("date", { ascending: false });

  if (replaysError) {
    console.error("Error fetching replays:", replaysError);
    return [];
  }

  // Fetch player stats for each replay
  const replaysWithStats = await Promise.all(
    replays.map(async (replay) => {
      const { data: playerStats, error: statsError } = await supabase
        .from("player_stats")
        .select("*")
        .eq("replay_id", replay.id);

      if (statsError) {
        console.error(
          `Error fetching player stats for replay ${replay.id}:`,
          statsError
        );
        return { ...replay, player_stats: [] };
      }

      return { ...replay, player_stats: playerStats };
    })
  );

  return replaysWithStats;
}

export default async function ReplaysPage() {
  const replays = await getReplaysWithPlayerStats();

  return (
    <div className="flex-1 w-full flex flex-col gap-6 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Replays</h1>
      </div>

      <div className="grid gap-6">
        {replays.map((replay) => (
          <ReplayCard key={replay.id} replay={replay} />
        ))}

        {replays.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No replays found
          </div>
        )}
      </div>
    </div>
  );
}
