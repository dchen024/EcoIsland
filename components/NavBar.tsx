"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
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
    name: "Redeem",
    href: "/redeem",
  },
  {
    name: "Return",
    href: "/return",
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
  const navigationArray = isLoggedIn ? [...sharedNavigation, ...blockNavigation] : [...sharedNavigation, ...navigationWithoutLogin];
  return (
    <nav
      className={`relative flex items-center justify-between px-5 py-5 md:mb-0 lg:mb-auto lg:justify-evenly ${toggle && !isLoggedIn && "mb-44"} ${toggle && isLoggedIn && "mb-64"}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">EcoIsland</Link>
        </div>
      </div>
      <ul
        className={`absolute top-20 mt-5 flex w-full flex-col items-center gap-2 md:relative md:top-auto md:mt-0 md:w-auto md:justify-center ${
          toggle ? "block" : "hidden"
        } md:flex md:flex-row`}
      >
        {navigationArray.map((item, index) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href}>
              <Button onClick={item.action} variant="ghost">{item.name}</Button>
            </Link>
          </NavigationMenuItem>
        ))}
      </ul>
      <div className={`block md:hidden`} onClick={() => setToggle(!toggle)}>
        {toggle ? <Button>Close Menu</Button> : <Button>Open Menu</Button>}
      </div>
    </nav>
  );
};

export default NavBar;
