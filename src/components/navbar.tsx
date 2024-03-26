"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  const isLogged = true;

  return (
    <div className="h-16 w-screen border-b backdrop-blur-sm absolute">
      <div className="container flex items-center h-full">
        <h1 className="text-xl font-bold">
          <a href="/">Bank Of ComputerCraft</a>
        </h1>
        <div className="flex-grow"></div>
        {isLogged ? (
          <ul className="flex gap-4">
            <li>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </li>
            <li>
              <Button variant="outline" asChild>
                <Link href="/transactions">Transactions</Link>
              </Button>
            </li>
            <li>
              <Button variant="outline" asChild>
                <Link href="/logout">Logout</Link>
              </Button>
            </li>
          </ul>
        ) : (
          <>
            <div className="w-5"></div>
            <ul className="flex gap-4">
              <li>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button variant="outline" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
