import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CreateTransactionForm } from "./CreateTransactionForm";

export function CreateTransactionButton({
  fullWidth,
  setBalance,
  isDesktop,
  fetchTransactions,
}: {
  fullWidth?: boolean;
  setBalance: (balance: number) => void;
  isDesktop: boolean;
  fetchTransactions: () => void;
}) {
  const [isCreateTransactionDialogOpen, setCreateTransactionDialogOpen] =
    React.useState(false);
  if (isDesktop)
    return (
      <Dialog
        open={isCreateTransactionDialogOpen}
        onOpenChange={setCreateTransactionDialogOpen}
      >
        <DialogTrigger
          asChild
          {...(fullWidth
            ? {
                className: "w-full",
              }
            : {})}
        >
          <Button variant={"outline"}>Create Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Transaction</DialogTitle>
          </DialogHeader>
          <CreateTransactionForm
            setBalance={setBalance}
            fetchTransactions={fetchTransactions}
          />
        </DialogContent>
      </Dialog>
    );
  return (
    <Drawer
      open={isCreateTransactionDialogOpen}
      onOpenChange={setCreateTransactionDialogOpen}
    >
      <DrawerTrigger
        asChild
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        <Button variant={"outline"}>Create Transaction</Button>
      </DrawerTrigger>
      <DrawerContent className="container pb-4">
        <DrawerHeader>
          <DialogTitle>Create Transaction</DialogTitle>
        </DrawerHeader>
        <CreateTransactionForm
          setBalance={setBalance}
          fetchTransactions={fetchTransactions}
        />
      </DrawerContent>
    </Drawer>
  );
}
