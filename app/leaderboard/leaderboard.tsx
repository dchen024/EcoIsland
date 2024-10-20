import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface LeaderBoard {
  id: string;
  username: string;
  score: number;
}

export default function Leaderboard({
  leaderboard,
}: {
  leaderboard: LeaderBoard[];
}) {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Boxes Returned</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard
            .sort((a, b) => b.score - a.score)
            .map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.score}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
