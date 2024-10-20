"use client";
import React, { useEffect } from "react";
import Leaderboard, { type LeaderBoard } from "./leaderboard";
import { getleaderboard } from "@/lib/leaderboard-action";

export default function LeaderBoard() {
  const [leaderboard, setLeaderboard] = React.useState<LeaderBoard[]>([]);
  useEffect(() => {
    getleaderboard().then(setLeaderboard);
  }, []);

  return (
    <div>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}
