"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { RegisterButton, LoginButton } from "@/lib/AuthButtons";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangePin } from "./ChangePin";
import { useState } from "react";

export function Navbar() {
  const { session } = useSession();

  return (
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b backdrop-blur-sm px-4 md:px-6 z-50">
      <div className="container flex items-center h-full">
        <h1 className="text-xl font-bold">
          <Link href="/">Bank Of ComputerCraft</Link>
        </h1>
        <div className="flex-grow"></div>
        <ul className="hidden gap-4 sm:flex">
          <NavButtons
            isLogged={session.status == "authenticated"}
            isLoaded={session.status != "loading"}
          />
        </ul>
        <div className="block sm:hidden">
          <MobileMenu
            isLogged={session.status == "authenticated"}
            isLoaded={session.status != "loading"}
          />
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
      <SheetContent className="flex flex-col">
        <SheetHeader className="border-b py-2">
          <SheetTitle>Bank Of ComputerCraft</SheetTitle>
        </SheetHeader>
        <ul className="gap-4 flex flex-col items-center h-full">
          <NavButtons isLogged={isLogged} fullWidth isLoaded={isLoaded} />
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
    props: React.PropsWithChildren<{ fullWidth?: boolean; className?: string }>,
  ): JSX.Element {
    const { fullWidth, children, className } = props;

    return (
      <li
        className={cn(className, {
          "w-full": fullWidth,
        })}
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
        className={cn({
          "w-full": fullWidth,
        })}
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
        <Skeleton className="w-40 h-10" />
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
                <Link href="/dashboard">Dashboard</Link>
              </NavButton>
            </NavItem>
            <NavItem
              className="h-full flex flex-col justify-end"
              fullWidth={fullWidth}
            >
              <ProfileDropdown />
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

function ProfileDropdown() {
  const { session, logout } = useSession();

  const [changePinOpen, setChangePinOpen] = useState(false);

  if (session.status != "authenticated") {
    return null;
  }

  return (
    <>
      <ChangePin open={changePinOpen} setOpen={setChangePinOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex gap-2 truncate w-full" variant="outline">
            <span className="flex-1 border-r pr-2 w-full text-muted-foreground font-mono text-sm">
              ${session.user.balance}
            </span>
            <span className="flex-1 w-full">{session.user.username}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setChangePinOpen(true)}>
            Change Pin
          </DropdownMenuItem>
          <ThemeToggle />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
