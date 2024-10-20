"use client";

import React, { useEffect, useState } from "react";
import Leaderboard, { type LeaderBoard } from "./leaderboard";
import { getleaderboard } from "@/lib/leaderboard-action";
import NavBar from "@/components/NavBar";
import { createClient } from "@/utils/supabase/client";

export default function LeaderBoardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderBoard[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    getleaderboard().then(setLeaderboard);

    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && session.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [supabase]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container mx-auto p-6">
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </>
  );
}
