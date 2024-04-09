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
import { CreateOrderForm } from "./CreateOrderForm";

export function CreateOrderButton(
    { fullWidth, isDesktop, fetchOrders: fetchOrders }:
    { fullWidth?: boolean; isDesktop: boolean; fetchOrders :() => void },
) {
    const [isCreateOrderDialogOpen, setCreateOrderDialogOpen] = React.useState(false);
    if (isDesktop)
        return (
            <Dialog open={isCreateOrderDialogOpen} onOpenChange={setCreateOrderDialogOpen}>
                <DialogTrigger
                    asChild
                    {...(fullWidth
                        ? {
                            className: "w-full",
                        }
                        : {})}
                >
                    <Button variant={"outline"}>Create Order</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Order</DialogTitle>
                    </DialogHeader>
                    <CreateOrderForm fetchOrders={fetchOrders} />
                </DialogContent>
            </Dialog>
        );
    return (
        <Drawer open={isCreateOrderDialogOpen} onOpenChange={setCreateOrderDialogOpen}>
            <DrawerTrigger
                asChild
                {...(fullWidth
                    ? {
                        className: "w-full",
                    }
                    : {})}
            >
                <Button variant={"outline"}>Create Order</Button>
            </DrawerTrigger>
            <DrawerContent className="container pb-4">
                <DrawerHeader>
                    <DialogTitle>Create Order</DialogTitle>
                </DrawerHeader>
                <CreateOrderForm fetchOrders={fetchOrders} />
            </DrawerContent>
        </Drawer>
    );
}
