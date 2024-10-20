"use server";
import { LeaderBoard } from "@/app/leaderboard/leaderboard";
import { createClient } from "@/utils/supabase/server";

export const getleaderboard = async (): Promise<LeaderBoard[]> => {
  const results: LeaderBoard[] = [];
  const supabase = createClient();
  const { error, data } = await supabase
    .from("profiles")
    .select(
      `
    id, full_name,
    container_transactions(id, status)`,
    )
    .eq("container_transactions.status", "Returned");

  if (error) {
    console.error(error);
    return [];
  }

  data.map((user) => {
    results.push({
      id: user.id,
      username: user.full_name,
      score: user.container_transactions.length,
    });
  });
  return results;
};
