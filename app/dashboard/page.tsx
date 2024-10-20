"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Link from "next/link";

interface Return {
  id: string;
  containerId: string;
  returnDate: string;
}

const Dashboard = () => {
  const [userMetrics, setUserMetrics] = useState({
    totalContainers: 10,
    totalPoints: 500,
  });

  const [recentReturns, setRecentReturns] = useState<Return[]>([
    {
      id: "1",
      containerId: "12345",
      returnDate: "2024-10-19",
    },
    {
      id: "2",
      containerId: "67890",
      returnDate: "2024-10-20",
    },
  ]);

  useEffect(() => {
    // Fetch data here
  }, []);

  return (
    <>
      {/* NavBar */}
      <NavBar isLoggedIn={true} />
      <div className="container mx-auto p-6">
        {/* User Metrics */}
        <Card className="mb-6 p-4">
          <h2 className="mb-4 text-2xl font-bold">Your Metrics</h2>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Containers Returned:</p>
              <p>{userMetrics.totalContainers}</p>
            </div>
            <div>
              <p className="font-semibold">Points Accumulated:</p>
              <p>{userMetrics.totalPoints}</p>
            </div>
            <div>
              <p className="font-semibold">CO2 Saved (kg):</p>
              {/* Random calculation for now */}
              <p>{userMetrics.totalContainers * 1.5}</p>
            </div>
          </div>
        </Card>

        {/* Recent Returns */}
        <h3 className="mb-4 text-xl font-bold">Recent Returns</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentReturns.map((returnItem) => (
            <Card key={returnItem.id} className="p-4">
              <p>
                <strong>Container ID:</strong> {returnItem.containerId}
              </p>
              <p>
                <strong>Return Date:</strong>{" "}
                {new Date(returnItem.returnDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>

        {/* Button to return more boxes */}
        <div className="mt-6">
          <Button className="w-full">
            {/* For now just take to home page */}
            <Link href="/">Return More Boxes</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
