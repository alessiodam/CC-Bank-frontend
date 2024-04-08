"use client";
import { Search } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import IOrder from "@/lib/types/IOrders";

const testingOrders = [
  {
    id: 1,
    item: "minecraft:oak_log",
    item_count: 1,
    amount: 2,
    tax: 0.05,
    date: "2022-01-01",
  },
  {
    id: 2,
    item: "minecraft:oak_planks",
    item_count: 1,
    amount: 2,
    tax: 0.05,
    date: "2022-01-01",
  },
  {
    id: 3,
    item: "minecraft:oak_stairs",
    item_count: 1,
    amount: 1,
    tax: 0.05,
    date: "2022-01-01",
  },
];

function OrderRow({
  id,
  item,
  item_count,
  amount,
  date,
  tax,
}: IOrder): JSX.Element {
  return (
    <TableRow>
      <TableCell className="max-sm:hidden">{id}</TableCell>
      <TableCell className="max-sm:hidden">{item}</TableCell>
      <TableCell className="max-sm:hidden">{amount}</TableCell>
      <TableCell className="max-sm:hidden">{item_count}</TableCell>
      <TableCell className="max-sm:hidden">{date}</TableCell>
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
                        Bought {item_count} of {item} for {amount * item_count}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="p-4 border rounded-md">
                      <p className="flex justify-between">
                        <span>Item name:</span>
                        <span>{item}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Item count:</span>
                        <span>{item_count}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Price per item:</span>
                        <span>{amount}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Order subtotal (no tax):</span>
                        <span>{amount * item_count}</span>
                      </p>
                      <br />
                      <p className="flex justify-between">
                        <span>Transaction Fee (Tax):</span>
                        <span>{tax}</span>
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
                      Bought {item_count} of {item} for {amount * item_count}
                    </DrawerTitle>
                  </DrawerHeader>
                  <br />
                  <div className="container">
                    <div className="p-4 border rounded-md">
                    <p className="flex justify-between">
                        <span>Item:</span>
                        <span>{item}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Amount:</span>
                        <span>{amount}</span>
                      </p>
                      <br />
                      <p className="flex justify-between">
                        <span>Transaction Fee (Tax):</span>
                        <span>{tax}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Item count:</span>
                        <span>{amount}</span>
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

export default function ClickNCollect() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);

  async function fetchOrders() {
    setIsOrdersLoading(true);
    const headers = new Headers();
    const sessionToken = getCookie("session_token");
    if (sessionToken) {
      headers.append("Session-Token", sessionToken);
    }

    /*
    const transactionsResponse = await fetch(
      `https://ccbank.tkbstudios.com/api/v1/transactions/list`,
      {
        headers: headers,
      },
    );

    if (transactionsResponse.status == 200) {
      let data = await transactionsResponse.json();
      setTransactions(data);
      setIsTransactionsLoading(false);
    }
    */

    setOrders(testingOrders);
    setIsOrdersLoading(false)
  }

  useEffect(() => {
    (async () => {
      let isSessionTokenSet = getCookie("session_token");
      if (isSessionTokenSet) {
        const headers = new Headers();
        const sessionToken = getCookie("session_token");
        if (sessionToken) {
          headers.append("Session-Token", sessionToken);
        }

        // request balance
        const balanceResponse = await fetch(
          "https://ccbank.tkbstudios.com/api/v1/balance",
          {
            headers: headers,
          },
        );

        if (balanceResponse.status === 200) {
          const data = await balanceResponse.json();
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

        const transactionCountResponse = await fetch(
          "https://ccbank.tkbstudios.com/api/v1/transactions/count",
          {
            headers: headers,
          },
        );
        if (transactionCountResponse.status === 200) {
          const data = await transactionCountResponse.json();
          setTotalOrders(data.count);
          console.log("data:", data);
        }

        fetchOrders();
      } else {
        setTimeout(() => {
          toast.error("You are not logged in. Redirecting to home page.");
          router.push("/");
        }, 100);
      }
    })();
  }, [router]);

  return (
    <div className="flex w-full flex-col px-4 md:px-6">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-8 p-4 container">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="grid gap-2">
              <CardTitle>My Orders</CardTitle>
              <CardDescription>
                A list of all recent orders
              </CardDescription>
            </div>
            {/* <CreateTransactionButton
              setBalance={setBalance}
              isDesktop={window.innerWidth > 1024}
              fetchTransactions={fetchTransactions}
            /> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Item name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Inspect</TableHead>
                </TableRow>
              </TableHeader>
              {isOrdersLoading ? (
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
                  {orders.map(order => (
                    <OrderRow
                      key={order.id}
                      id={order.id}
                      item_count={order.item_count}
                      item={order.item}
                      amount={order.amount}
                      tax={order.tax}
                      date={order.date}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
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
  if (totalTransactions < 0) {
    console.error("totalTransactions is lower than 0");
    return <p>An error occured.</p>;
  }

  if (isNaN(Number(currentPageString)) || isNaN(Number(perPageString))) {
    window.location.href = "/dashboard/15/1";
  }

  const currentPage = Number(currentPageString),
    perPage = Number(perPageString),
    totalPages = Math.ceil(totalTransactions / perPage);

  if (currentPage > totalPages) {
    // window.location.href = "/dashboard/15/1";
  }

  console.log(totalPages, currentPage, totalTransactions, perPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage == 1 ? (
            <PaginationPrevious className="pointer-events-none text-zinc-500" />
          ) : (
            <PaginationPrevious href={String(currentPage + 1)} />
          )}
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage - 1 > 0 && (
          <PaginationItem>
            <PaginationLink href={String(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink href={String(currentPage + 1)}>
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
            <PaginationNext href={String(currentPage + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
