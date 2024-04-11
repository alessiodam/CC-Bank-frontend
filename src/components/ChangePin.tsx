"use client";
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
import { useSession } from "@/lib/session";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const changePinFormSchema = z.object({
  pin: z
    .string()
    .min(4, "PIN must be at least 4 characters long")
    .max(16, "PIN must be at most 16 characters long"),
  confirmPin: z
    .string()
    .min(4, "PIN must be at least 4 characters long")
    .max(16, "PIN must be at most 16 characters long"),
});

export function ChangePin({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const onSuccess = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Pin</DialogTitle>
          <DialogDescription>
            Change your pin to something new.
          </DialogDescription>
        </DialogHeader>
        <ChangePinForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}

export function ChangePinForm({ onSuccess }: { onSuccess?: () => void; }) {
  const { session } = useSession();

  const [isProcessing, setProcessing] = useState(false);

  const changePinForm = useForm<z.infer<typeof changePinFormSchema>>({
    resolver: zodResolver(changePinFormSchema),
  });

  async function onSubmit(values: z.infer<typeof changePinFormSchema>) {
    if (session.status !== "authenticated") {
      toast.error("You must be logged in to change your PIN!");
      return;
    }

    setProcessing(true);

    if (Number.isNaN(Number(values.pin))) {
      toast.error("PIN must be a number!");
      setProcessing(false);
      return;
    }

    if (values.pin !== values.confirmPin) {
      toast.error("PIN's do not match!");
      setProcessing(false);
      return;
    }

    const response = await fetch(
      "https://ccbank.tkbstudios.com/api/v1/change-pin",
      {
        method: "POST",
        headers: {
          "Session-Token": session.user.token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          new_pin: values.pin,
        }),
      },
    ).catch((e) => {
      toast.error(
        "An error occurred while changing your pin. Please try again.",
      );
      setProcessing(false);
      console.error(e);
      throw e;
    });

    const data = await response.json();

    if (!data.success) {
      toast.error(data.message);
      setProcessing(false);
      return;
    }

    toast.success("Changed pin succesfully!");
    setProcessing(false);

    if (onSuccess) onSuccess();
  }

  return (
    <Form {...changePinForm}>
      <form
        onSubmit={changePinForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={changePinForm.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={changePinForm.control}
          name="confirmPin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm PIN</FormLabel>
              <FormControl>
                <Input {...field} />
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
