"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Menu } from "lucide-react";
import { hasCookie } from "cookies-next";
import { RegisterButton, LoginButton, LogoutButton } from "@/lib/AuthButtons";

export function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLogged(hasCookie("session_token"));
    setIsLoaded(true);
  }, []);

  return (
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b backdrop-blur-sm px-4 md:px-6 z-50">
      <div className="container flex items-center h-full">
        <h1 className="text-xl font-bold">
          <Link href="/">Bank Of ComputerCraft</Link>
        </h1>
        <div className="flex-grow"></div>
        <ul className="hidden gap-4 sm:flex">
          <NavButtons isLogged={isLogged} isLoaded={isLoaded} />
          <li>
            <ThemeToggle alignment="end" />
          </li>
        </ul>
        <div className="block sm:hidden">
          <MobileMenu isLogged={isLogged} isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  isLogged,
  isLoaded,
}: {
  isLogged: boolean;
  isLoaded: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" title="Menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Bank Of ComputerCraft</SheetTitle>
        </SheetHeader>
        <br />
        <ul className="gap-4 flex flex-col items-center">
          <NavButtons isLogged={isLogged} fullWidth isLoaded={isLoaded} />
          <li className="w-full">
            <ThemeToggle fullWidth alignment="center" />
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}

function NavButtons({
  isLogged,
  fullWidth,
  isLoaded,
}: {
  isLogged: boolean;
  fullWidth?: boolean;
  isLoaded: boolean;
}) {
  function NavItem(
    props: React.PropsWithChildren<{ fullWidth?: boolean }>,
  ): JSX.Element {
    const { fullWidth, children } = props;

    return (
      <li
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        {children}
      </li>
    );
  }

  function NavButton(
    props: React.PropsWithChildren<{ fullWidth?: boolean }>,
  ): JSX.Element {
    const { fullWidth, children } = props;

    return (
      <Button
        variant="outline"
        asChild
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        {children}
      </Button>
    );
  }

  function NavSkeleton() {
    return (
      <li
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        <Skeleton className="w-20 h-full" />
      </li>
    );
  }

  return (
    <>
      {isLoaded ? (
        isLogged ? (
          <>
            <NavItem fullWidth={fullWidth}>
              <NavButton fullWidth={fullWidth}>
                <Link href="/dashboard/1/15">Dashboard</Link>
              </NavButton>
            </NavItem>
            <NavItem fullWidth={fullWidth}>
              <LogoutButton fullWidth={fullWidth} />
            </NavItem>
          </>
        ) : (
          <>
            <NavItem fullWidth={fullWidth}>
              <LoginButton fullWidth={fullWidth} />
            </NavItem>
            <NavItem fullWidth={fullWidth}>
              <RegisterButton fullWidth={fullWidth} />
            </NavItem>
          </>
        )
      ) : (
        <>
          <NavSkeleton />
          <NavSkeleton />
        </>
      )}
    </>
  );
}
