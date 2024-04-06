"use client";
import Link from "next/link";
import { ArrowUpRight, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function TransactionRow({
  date,
  user,
  amount,
}: {
  date: number;
  user: string;
  amount: string;
}): JSX.Element {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {new Date(date).toLocaleDateString()}
      </TableCell>
      <TableCell>{user}</TableCell>
      <TableCell className="text-right">{amount}</TableCell>
    </TableRow>
  );
}

function BalanceCounter({
  balance,
  isLoaded,
}: {
  balance: number;
  isLoaded: boolean;
}): JSX.Element {
  // the logic:
  // create a span for each digit in the balance
  // add 1,2,3,4,5,6,7,8,9,0 into the span
  // add more numbers to the span (1,2,3,4,5,6,7,8,9,0 * digits (counting from left side))
  // calculate the transform value based on the digit
  // animate the transform value

  function Digits() {
    return Array.from({ length: 10 }, (_, i) => i).map((digit) => {
      return (
        <span key={digit} className="flex">
          {digit}
        </span>
      );
    });
  }
  return (
    <span className="flex gap-2 overflow-hidden">
      {balance
        .toString()
        .split("")
        .map((digit, index) => {
          // digit represents the final position of the digit, index
          return (
            <span key={index} className="flex h-9">
              <span
                className="flex flex-col h-fit ease-out"
                style={
                  {
                    transform: `translateY(-${
                      isLoaded
                        ? (Number(digit) / (index + 1)) * 10 +
                          (index == 0 ? 0 : 100 - (1 / (index + 1)) * 100)
                        : 0
                    }%)`,
                    transition: "all 2.5s cubic-bezier(0.09, 0.61, 0.14, 0.99)",
                  } as React.CSSProperties
                }
              >
                {
                  // put Digits for each digit but put more for each digit
                  // eg: index 0 = 1,2,3,4,5,6,7,8,9,0
                  // index 1 = 1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0
                  // you get the idea
                  Array.from({ length: index + 1 }).map((_, i) => {
                    return <Digits key={i} />;
                  })
                }
              </span>
            </span>
          );
        })}
    </span>
  );
}

export default function Dashboard({
  params,
}: {
  params: { page: string; perPage: string };
}) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      let isSessionTokenSet = getCookie("session_token");
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
          const data = await response.json();
          console.log(data);
          setBalance(data);
          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
        } else {
          deleteCookie("session_token");
          setTimeout(() => {
            // wait for sonner to load
            toast.error(
              "Invalid session token. Please log in again. This happens when you log in from somewhere else",
            );
            router.push("/");
          }, 100);
        }
      } else {
        setTimeout(() => {
          // wait for sonner to load
          toast.error("You are not logged in. Redirecting to home page.");
          router.push("/");
        }, 100);
      }
    })();
  });

  return (
    <div className="flex w-full flex-col px-4 md:px-6">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-8 p-4 container">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              OKU
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              <BalanceCounter balance={balance} isLoaded={isLoaded} />
            </div>
            {/* <p className="text-sm text-muted-foreground">
              +20.1% from last month 
            </p> */}
            {/* To be implemented in the API */}
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                A list of all recent transactions
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{}</TableBody>
            </Table>
            <br />
            <RenderPagination
              currentPage={params.page}
              totalTransactions={15}
              perPage={params.perPage}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
function RenderPagination({
  currentPage: currentPageString,
  totalTransactions,
  perPage: perPageString,
}: {
  currentPage: string;
  totalTransactions: number;
  perPage: string;
}) {
  if (isNaN(Number(currentPageString)) || isNaN(Number(perPageString))) {
    window.location.href = "/dashboard/1/15";
  }

  const currentPage = Number(currentPageString),
    perPage = Number(perPageString);

  if (currentPage > totalTransactions / perPage) {
    window.location.href = "/dashboard/1/15";
  }

  const totalPages = Math.ceil(totalTransactions / perPage);

  console.log(totalPages, currentPage, totalTransactions, perPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
