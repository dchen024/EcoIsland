"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { signout } from "@/lib/auth-actions";

interface NavBarProps {
  isLoggedIn: boolean;
}

interface navigationProps {
  name: string;
  href: string;
  action?: () => void;
}

const blockNavigation: navigationProps[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Return",
    href: "/return",
  },
  {
    name: "Vendor",
    href: "/vendor",
  },
  {
    name: "Admin",
    href: "/admin",
  },
  {
    name: "Logout",
    href: "/logout",
    action: () => signout(),
  },
];

const sharedNavigation: navigationProps[] = [
  {
    name: "Leaderboard",
    href: "/leaderboard",
  },
];

const navigationWithoutLogin: navigationProps[] = [
  {
    name: "Sign Up",
    href: "/signup",
  },
  {
    name: "Login",
    href: "/login",
  },
];

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
  const [toggle, setToggle] = React.useState(false);
  const navigationArray = isLoggedIn
    ? [...sharedNavigation, ...blockNavigation]
    : [...sharedNavigation, ...navigationWithoutLogin];

  return (
    <nav
      className={`relative flex items-center justify-between py-5 md:mb-0 lg:mb-auto lg:justify-evenly ${
        toggle && !isLoggedIn && "mb-44"
      } ${toggle && isLoggedIn && "mb-64"} bg-green-500 text-white`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/" className="text-white">
            EcoIsland
          </Link>
        </div>
      </div>
      <ul
        className={`absolute top-20 flex w-full flex-col items-center gap-2 md:relative md:top-auto md:mt-0 md:w-auto md:justify-center ${
          toggle ? "block bg-green-500 text-white" : "hidden"
        } md:flex md:flex-row`}
      >
        {navigationArray.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href}>
              <Button
                onClick={item.action}
                variant="ghost"
                className="text-white hover:bg-green-400 hover:text-green-100"
              >
                {item.name}
              </Button>
            </Link>
          </NavigationMenuItem>
        ))}
      </ul>
      <div className={`block md:hidden`} onClick={() => setToggle(!toggle)}>
        {toggle ? (
          <Button className="bg-green-500 text-white hover:bg-green-400 hover:text-green-100">
            Close Menu
          </Button>
        ) : (
          <Button className="bg-green-500 text-white hover:bg-green-400 hover:text-green-100">
            Open Menu
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
