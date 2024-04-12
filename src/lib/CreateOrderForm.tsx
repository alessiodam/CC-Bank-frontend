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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AVAILABLE_ITEMS = ["minecraft:oak_log", "minecraft:oak_planks", "minecraft:oak_stairs"] as const;

const AvailableItemsEnum = z.enum(AVAILABLE_ITEMS);
type AvailableItemsEnum = z.infer<typeof AvailableItemsEnum>;

const transactionFormSchema = z.object({
    item: AvailableItemsEnum,
    amount: z.number().positive("Amount must be a positive number").min(1, "Amount must be at least 1"),
});

export function CreateOrderForm({ fetchOrders }: { fetchOrders: () => void }) {
    const [isProcessing, setProcessing] = React.useState(false);

    const orderForm = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            item: "minecraft:oak_log",
            amount: 1,
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

        // Simulate API response during development
        const data = {
            success: true,
            message: "Successfully ordered!",
            item: values.item,
            amount: values.amount,
            price: 2,
            balance: 1000
        } as {
            success: boolean;
            message: string;
            item: string;
            amount: number;
            price: number;
            balance: number;
        };

        // Uncomment the following block when API is ready
        /*
        const response = await fetch("https://ccbank.tkbstudios.com/api/v1/transactions/new", {
            method: "POST",
            headers: {
                "Session-Token": getCookie("session_token") as string,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(values),
        }).catch((e) => {
            toast.error("An error occurred while ordering. Please try again.");
            setProcessing(false);
            console.error(e);
            throw e;
        });

        console.log(response);

        const data = await (response as Response).json();
         */

        if (!data.success) {
            toast.error(data.message);
            setProcessing(false);
            return;
        }

        toast.success("Order success!");
        setProcessing(false);
        orderForm.reset();
        fetchOrders();
        return;
    }

    return (
        <Form {...orderForm}>
            <form onSubmit={orderForm.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={orderForm.control}
                    name="item"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item</FormLabel>
                            <FormControl>
                                <Select {...field}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select an item" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AVAILABLE_ITEMS.map(item => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={orderForm.control}
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
