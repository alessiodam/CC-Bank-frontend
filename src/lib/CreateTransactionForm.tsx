"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

const transactionFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, "Username is too long")
    .min(3, "Username is too short"),
  amount: z.string().min(1, "Amount is required"),
  note: z.string().min(1, "Note").max(30, "Note is too long").optional(),
});

export function CreateTransactionForm({
  setBalance,
  fetchTransactions,
}: {
  setBalance: (balance: number) => void;
  fetchTransactions: () => void;
}) {
  const [isProcessing, setProcessing] = React.useState(false);

  const transactionForm = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      username: "",
      amount: "0.01",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    setProcessing(true);
    console.log(values);

    if (Number.isNaN(Number(values.amount))) {
      toast.error("Amount must be a number!");
      setProcessing(false);
      return;
    }

    const response = await fetch(
      "https://ccbank.tkbstudios.com/api/v1/transactions/new",
      {
        method: "POST",
        headers: {
          "Session-Token": getCookie("session_token") as string,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      },
    ).catch((e) => {
      toast.error(
        "An error occurred while creating transaction. Please try again.",
      );
      setProcessing(false);
      console.error(e);
      throw e;
    });

    console.log(response);

    const data = await (response as Response).json();

    if (!data.success) {
      toast.error(data.message);
      setProcessing(false);
      return;
    }

    toast.success("Transaction success!");
    setProcessing(false);
    transactionForm.reset();
    setBalance(data.balance);
    fetchTransactions();
    return;
  }

  return (
    <Form {...transactionForm}>
      <form
        onSubmit={transactionForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={transactionForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="tkbstudios" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={transactionForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={transactionForm.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="No note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isProcessing ? (
          <Button type="submit" variant={"outline"} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
