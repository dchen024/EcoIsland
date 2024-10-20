"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { signout } from "@/lib/auth-actions";

interface NavBarProps {
  isLoggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Project Name */}
        <div className="text-xl font-bold">
          <Link href="/">EcoIsland</Link>
        </div>

        {/* Navigation Buttons */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button onClick={() => signout()} variant="ghost">
                    Logout
                  </Button>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/signup">
                    <Button variant="ghost">Sign Up</Button>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default NavBar;
