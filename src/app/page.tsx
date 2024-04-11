"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginButton, RegisterButton } from "../lib/AuthButtons";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/session";

export default function Home() {
  const { session } = useSession();

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] w-screen px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Bank Of ComputerCraft</h1>
        <br />
        <p className="text-lg">Welcome to the Bank Of ComputerCraft.</p>
        <p className="text-lg">
          Your trusted source for advanced computer services.
        </p>
        <p>
          It is a bank system synced across all servers, allowing users to
          access their coins and funds seamlessly across different servers.
        </p>
        <br />
        <p>
          To install Bank Of ComputerCraft into an Advanced Computer, use the
          following one-liner:
        </p>
        <br />
        <div className="flex justify-center w-full">
          <Alert className="w-fit">
            <AlertDescription>
              wget run https://pinestore.cc/d/67
            </AlertDescription>
            {/* TODO: add copy button */}
          </Alert>
        </div>
        <br />
        <p>
          There is a web dashboard! (You will need to create the account
          in-game)
        </p>
        <br />
        <div className="w-full flex justify-center gap-10">
          {session.status !== "loading" ? (
            session.status == "authenticated" ? (
              <div className="flex flex-col gap-4">
                <p>You are already logged in! 🎉🎉</p>

                <Button asChild variant={"outline"}>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <>
                <LoginButton />
                <RegisterButton />
              </>
            )
          ) : (
            <>
              <Skeleton className="w-20 h-10" />
              <Skeleton className="w-20 h-10" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
