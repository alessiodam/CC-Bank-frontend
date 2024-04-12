"use client";
import { DollarSign, Search } from "lucide-react";
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
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ITransaction from "@/lib/types/ITransactions";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CreateTransactionButton } from "@/lib/TransactionButtons";
import { Skeleton } from "@/components/ui/skeleton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSession } from "@/lib/session";

function TransactionRow({
  from_user,
  to_user,
  amount,
  id,
  note,
  date,
  tax,
}: ITransaction): JSX.Element {
  return (
    <TableRow>
      <TableCell className="max-sm:hidden">{id}</TableCell>
      <TableCell className="max-sm:hidden">{from_user}</TableCell>
      <TableCell>{to_user}</TableCell>
      <TableCell className="max-sm:hidden">{amount}</TableCell>
      <TableCell className="max-md:hidden">{tax}</TableCell>
      <TableCell className="max-lg:hidden">
        {new Date(date).toLocaleString()}
      </TableCell>
      <TableCell>
        <div className="flex justify-end">
          {(() => {
            const isDesktop = window.innerWidth > 1024;

            if (isDesktop)
              return (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size={"icon"}>
                      <Search className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Transaction from {from_user} to {to_user}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="p-4 border rounded-md">
                      <p className="flex justify-between">
                        <span>From:</span>
                        <span>{from_user}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>To:</span>
                        <span>{to_user}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Note:</span>
                        <span>{note}</span>
                      </p>
                      <br />
                      <p className="flex justify-between">
                        <span>Transaction Fee (Tax):</span>
                        <span>{tax}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Amount:</span>
                        <span>{amount}</span>
                      </p>
                      <br />
                      <p className="flex justify-between">
                        <span>ID:</span>
                        <span>{id}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Date:</span>
                        <span>{new Date(date).toLocaleString()}</span>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              );

            return (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button size={"icon"}>
                    <Search className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      Transaction from {from_user} to {to_user}
                    </DrawerTitle>
                  </DrawerHeader>
                  <br />
                  <div className="container">
                    <div className="p-4 border rounded-md">
                      <p className="flex justify-between">
                        <span>From:</span>
                        <span>{from_user}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>To:</span>
                        <span>{to_user}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Note:</span>
                        <span>{note}</span>
                      </p>
                      <br />
                      <p className="flex justify-between">
                        <span>Transaction Fee (Tax):</span>
                        <span>{tax}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Amount:</span>
                        <span>{amount}</span>
                      </p>
                      <br />
                      <p className="flex justify-between">
                        <span>ID:</span>
                        <span>{id}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Date:</span>
                        <span>{new Date(date).toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            );
          })()}
        </div>
      </TableCell>
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
              {(() => {
                if (isNaN(Number(digit))) {
                  return <span>.</span>;
                }

                // Number animation
                return (
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
                        transition:
                          "all 2.5s cubic-bezier(0.09, 0.61, 0.14, 0.99)",
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
                );
              })()}
            </span>
          );
        })}
    </span>
  );
}

export default function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const perPage = searchParams["perPage"] || "15";
  const page = searchParams["page"] || "1";

  const { session, setSession } = useSession();

  const router = useRouter();
  const [currentURL, setCurrentURL] = useState(
    "https://ccbank.tkbstudios.com" + usePathname()
  );

  const [isDesktop, setIsDesktop] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [balanceLoaded, setBalanceLoaded] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setIsTransactionsLoading(true);

    if (session.status !== "authenticated") return;

    const response = await fetch(
      `https://ccbank.tkbstudios.com/api/v1/transactions/list?per_page=${perPage}&page=${page}`,
      {
        headers: {
          "Session-Token": session.user.token,
        },
      }
    );

    if (response.status !== 200) {
      console.error("Error fetching transactions");
      return;
    }

    const data = await response.json();

    setTransactions(data);
    setIsTransactionsLoading(false);
  }, [page, perPage, session]);

  const fetchTransactionCount = useCallback(async () => {
    if (session.status !== "authenticated") return;

    const response = await fetch(
      "https://ccbank.tkbstudios.com/api/v1/transactions/count",
      {
        headers: {
          "Session-Token": session.user.token,
        },
      }
    );

    if (response.status !== 200) {
      console.error("Error fetching transaction count");
      return;
    }

    const data = await response.json();

    setTotalTransactions(data.count);
  }, [session]);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);
    setCurrentURL(window.location.href);
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchTransactionCount();
  }, [fetchTransactionCount, fetchTransactions]);

  useEffect(() => {
    if (session.status === "authenticated" && !balanceLoaded) {
      setTimeout(() => {
        setBalanceLoaded(true);
      }, 100);
    }
  }, [session, balanceLoaded]);

  if (session.status === "unauthenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex w-full flex-col px-4 md:px-6">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-8 p-4 container">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Balance</CardTitle>
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              OKU
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              <BalanceCounter
                balance={session.user?.balance || 0}
                isLoaded={balanceLoaded}
              />
            </div>
            {/* <p className="text-sm text-muted-foreground">
              +20.1% from last month 
            </p> */}
            {/* To be implemented in the API */}
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                A list of all recent transactions
              </CardDescription>
            </div>
            <CreateTransactionButton
              setBalance={(balance) => {
                if (session.status == "authenticated") {
                  setSession({
                    ...session,
                    user: { ...session.user, balance },
                  });
                }
              }}
              isDesktop={isDesktop}
              fetchTransactions={fetchTransactions}
            />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="max-sm:hidden">ID</TableHead>
                  <TableHead className="max-sm:hidden">From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="max-sm:hidden">Amount</TableHead>
                  <TableHead className="max-md:hidden">Paid tax</TableHead>
                  <TableHead className="max-lg:hidden">Date</TableHead>
                  <TableHead className="text-right">Inspect</TableHead>
                </TableRow>
              </TableHeader>
              {isTransactionsLoading ? (
                <TableBody>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6}>
                        <Skeleton className="h-6" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {transactions.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      from_user={transaction.from_user}
                      to_user={transaction.to_user}
                      amount={transaction.amount}
                      id={transaction.id}
                      note={transaction.note}
                      date={transaction.date}
                      tax={transaction.tax}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
            <br />
            <RenderPagination
              currentPage={page}
              totalTransactions={totalTransactions}
              perPage={perPage}
              router={router}
              currentURL={currentURL}
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
  router,
  currentURL,
}: {
  currentPage: string;
  totalTransactions: number;
  perPage: string;
  router: AppRouterInstance;
  currentURL: string;
}) {
  if (totalTransactions < 0) {
    console.error("totalTransactions is lower than 0");
    return <p>An error occured.</p>;
  }

  if (isNaN(Number(currentPageString)) || isNaN(Number(perPageString))) {
    router.push("/dashboard");
  }

  const currentPage = Number(currentPageString),
    perPage = Number(perPageString),
    totalPages = Math.ceil(totalTransactions / perPage);

  if (currentPage > totalPages) {
    // window.location.href = "/dashboard/15/1";
  }

  console.log(totalPages, currentPage, totalTransactions, perPage);

  const createPaginatedURL = (page: string) => {
    console.log("pathname:", currentURL);
    const url = new URL(currentURL);

    url.searchParams.set("page", page);

    return url.toString();
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage == 1 ? (
            <PaginationPrevious className="pointer-events-none text-zinc-500" />
          ) : (
            <PaginationPrevious
              href={createPaginatedURL(String(currentPage - 1))}
            />
          )}
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage - 1 > 0 && (
          <PaginationItem>
            <PaginationLink href={createPaginatedURL(String(currentPage - 1))}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink href={createPaginatedURL(String(currentPage + 1))}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 2 <= totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          {currentPage == totalPages ? (
            <PaginationNext className="pointer-events-none text-zinc-500" />
          ) : (
            <PaginationNext
              href={createPaginatedURL(String(currentPage + 1))}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
