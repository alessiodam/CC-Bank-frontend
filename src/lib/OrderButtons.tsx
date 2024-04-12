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
    { fetchOrders: fetchOrders }:
    { fetchOrders :() => void },
) {
    const [isCreateOrderDialogOpen, setCreateOrderDialogOpen] = React.useState(false);
        return (
            <Dialog open={isCreateOrderDialogOpen} onOpenChange={setCreateOrderDialogOpen}>
                <DialogTrigger asChild>
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
}
