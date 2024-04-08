"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Loader2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { z } from "zod";
import { FormDescription } from "@/components/ui/form";
import { LoginButton, RegisterButton } from "../lib/AuthButtons";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const [isLogged, setIsLogged] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [isProcessing, setProcessing] = React.useState(false);

  const isRegistered =
    searchParams.get("action") == ("registered" || "loggedIn");

  if (isRegistered) {
    // Timeout for toast animation to load
    setTimeout(() => {
      toast.success("Successfully registered! You can now log in.");
    }, 100);
  }

  useEffect(() => {
    (async () => {
      let isSessionTokenSet = hasCookie("session_token");
      if (isSessionTokenSet) {
        // send api request to check if the token is valid
        const headers = new Headers();
        const sessionToken = getCookie("session_token");
        if (sessionToken) {
          headers.append("Session-Token", sessionToken);
        }

        const response = await fetch(
          "https://ccbank.tkbstudios.com/api/v1/balance",
          {
            headers: headers,
          },
        );

        if (response.status === 200) {
          setIsLogged(true);
        } else {
          deleteCookie("session_token");
          toast.error(
            "Invalid session token. Please log in again. This happens when you log in from somewhere else",
          );
        }
      }
      setIsLoaded(true);
    })();
  }, []);

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
          {isLoaded ? (
            isLogged ? (
              <div className="flex flex-col gap-4">
                <p>You are already logged in! 🎉🎉</p>

                <Button asChild variant={"outline"}>
                  <Link href="/dashboard/15/1">Dashboard</Link>
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
