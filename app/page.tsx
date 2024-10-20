"use client";

import { useState, useEffect } from "react";
import LoginButton from "@/components/LoginLogoutButton";
import NavBar from "@/components/NavBar";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      if (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, [supabase]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50 p-24 dark:bg-gray-900">
        {/* Hero */}
        <div className="z-10 w-full max-w-5xl text-center">
          <h1 className="mb-6 text-4xl font-bold">
            Welcome to EcoIsland – Promoting Sustainability on Governors Island
          </h1>
          <p className="mb-6 text-lg">
            Join our mission to protect the environment by tracking your impact
            and earning rewards as you help reduce waste on Governors Island.
          </p>
          <div className="mt-8">
            <LoginButton />
          </div>
        </div>

        {/* Features */}
        <div className="my-16 grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition hover:shadow-2xl">
            <h2 className="mb-3 text-2xl font-semibold">Track Your Impact</h2>
            <p>
              Keep an eye on your eco-friendly efforts with real-time metrics
              showing how your reusable container returns reduce waste on
              Governors Island.
            </p>
          </div>

          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition hover:shadow-2xl">
            <h2 className="mb-3 text-2xl font-semibold">Earn Rewards</h2>
            <p>
              Earn points each time you return a reusable container and unlock
              rewards for making a positive impact on the local environment.
            </p>
          </div>

          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition hover:shadow-2xl">
            <h2 className="mb-3 text-2xl font-semibold">Seamless Scanning</h2>
            <p>
              Our QR code system makes returning containers effortless, allowing
              you to update your account instantly while helping Governors
              Island stay green.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 flex w-full max-w-5xl items-center justify-center border-t border-gray-300 pt-6 text-sm">
          <p>&copy; 2024 EcoIsland</p>
        </div>
      </main>
    </>
  );
}
