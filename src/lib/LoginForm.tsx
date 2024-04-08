"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCookie } from "cookies-next";
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

const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  pin: z
    .string()
    .min(4, "PIN must be at least 4 characters long")
    .max(16, "PIN must be at most 16 characters long"),
});

export function LoginForm() {
  const [isProcessing, setProcessing] = React.useState(false);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      pin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setProcessing(true);
    console.log(values);

    if (Number.isNaN(Number(values.pin))) {
      toast.error("PIN must be a number!");
      setProcessing(false);
      return;
    }

    const response = await fetch("https://ccbank.tkbstudios.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    }).catch((e) => {
      toast.error("An error occurred while logging in. Please try again.");
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

    toast.success("Logged in successfully!");
    setCookie("session_token", data.session_token, { secure: true });

    // redirect to dashboard
    window.location.href = "/dashboard/15/1";
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="okunamayanad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
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
