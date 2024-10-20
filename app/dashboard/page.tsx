"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface ReturnItem {
  id: string;
  containerId: string;
  returnDate: string;
}

interface UserMetrics {
  totalPoints: number;
  totalContainers: number;
}

const Dashboard: React.FC = () => {
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    totalPoints: 0,
    totalContainers: 0,
  });

  const [recentReturns, setRecentReturns] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const user = session?.user;
        if (!user) {
          console.error("User is not authenticated");
          return;
        }

        // Fetch user details
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("points, full_name")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // Count total containers from container_transactions table
        const { count: totalContainers, error: countError } = await supabase
          .from("container_transactions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id);

        if (countError) throw countError;

        console.log("Profile Data:", profileData);
        console.log("Total Containers:", totalContainers);

        setUserMetrics({
          totalPoints: profileData.points || 0,
          totalContainers: totalContainers || 0,
        });

        setUserName(profileData.full_name || "User");

        // Fetch recent return from container_transactions
        const { data: returnData, error: returnError } = await supabase
          .from("container_transactions")
          .select("id, container_id, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (returnError) throw returnError;

        const formattedReturns = returnData.map((item) => ({
          id: item.id,
          containerId: item.container_id,
          returnDate: item.created_at,
        }));
        setRecentReturns(formattedReturns);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [supabase]);

  if (loading) {
    return (
      <>
        <NavBar isLoggedIn={true} />
        <div className="container mx-auto p-6">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* NavBar */}
      <NavBar isLoggedIn={true} />
      <div className="container mx-auto p-6">
        {/* User Greeting */}
        <h2 className="mb-4 text-2xl font-bold">Hello, {userName}!</h2>

        {/* User Metrics */}
        <Card className="mb-6 p-8">
          <h2 className="mb-4 text-2xl font-bold">Your Metrics</h2>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Containers Returned:</p>
              <p>{userMetrics.totalContainers}</p>
            </div>
            <div>
              <p className="font-semibold">Current Points:</p>
              <p>{userMetrics.totalPoints}</p>
            </div>
            <div>
              <p className="font-semibold">CO₂ Saved (lbs):</p>
              {/* Specifically CO2, its around 3.3 lbs per container. */}
              <p>{(userMetrics.totalContainers * 3.3).toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Redeem Points */}
        <Card className="mb-6 p-8">
          <h2 className="mb-4 text-2xl font-bold">Redeem Points</h2>
          <div className="flex justify-center gap-16">
            <div>
              <h3 className="mb-4 text-xl font-bold">Donate to Charity:</h3>
              <div className="flex flex-col space-y-4">
                <Button>Donate $1 (1000 points)</Button>
                <Button>Donate $5 (5000 points)</Button>
                <Button>Donate $10 (10,000 points)</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">
                Discount on Next Order:
              </h3>
              <div className="flex flex-col space-y-4">
                <Button>Get $1 off (1000 points)</Button>
                <Button>Get $5 off (5000 points)</Button>
                <Button>Get $10 off (10,000 points)</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Returns */}
        <h3 className="mb-4 text-xl font-bold">Recent Returns</h3>
        {recentReturns.length > 0 ? (
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
        ) : (
          <p>No recent returns found.</p>
        )}

        {/* Button to return more boxes */}
        <div className="mt-6">
          <Link href="/return" passHref>
            <Button className="w-full" variant="secondary">
              Return Container
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
