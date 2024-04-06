"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LoginForm } from "./LoginForm";
import { deleteCookie } from "cookies-next";

export function RegisterButton(
  { fullWidth }: { fullWidth?: boolean } = { fullWidth: false },
) {
  const isDesktop = window.innerWidth > 1024;

  if (isDesktop)
    return (
      <Dialog>
        <DialogTrigger
          asChild
          {...(fullWidth
            ? {
                className: "w-full",
              }
            : {})}
        >
          <Button variant={"outline"}>Register</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>just read the instructions next time lol</DialogTitle>
            <DialogDescription>
              if you were to read the instructions, you would know that you need
              to create an account in-game first.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer>
      <DrawerTrigger
        asChild
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        <Button variant={"outline"}>Register</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>just read the instructions next time lol</DrawerTitle>
          <DrawerDescription>
            if you were to read the instructions, you would know that you need
            to create an account in-game first.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export function LoginButton(
  { fullWidth }: { fullWidth?: boolean } = { fullWidth: false },
) {
  const [isLoginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const isDesktop = window.innerWidth > 1024;
  if (isDesktop)
    return (
      <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogTrigger
          asChild
          {...(fullWidth
            ? {
                className: "w-full",
              }
            : {})}
        >
          <Button variant={"outline"}>Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to Bank of ComputerCraft</DialogTitle>
          </DialogHeader>

          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  return (
    <Drawer open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
      <DrawerTrigger
        asChild
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        <Button variant={"outline"}>Login</Button>
      </DrawerTrigger>
      <DrawerContent className="container pb-4">
        <DrawerHeader>
          <DialogTitle>Login to Bank of ComputerCraft</DialogTitle>
        </DrawerHeader>

        <LoginForm />
      </DrawerContent>
    </Drawer>
  );
}

export function LogoutButton(
  { fullWidth }: { fullWidth?: boolean } = { fullWidth: false },
) {
  const isDesktop = window.innerWidth > 1024;

  if (isDesktop)
    return (
      <Dialog>
        <DialogTrigger
          asChild
          {...(fullWidth
            ? {
                className: "w-full",
              }
            : {})}
        >
          <Button variant={"outline"}>Logout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure logging out? You can always log back in.
            </DialogDescription>
          </DialogHeader>
          <br />
          <div className="flex gap-4 w-full">
            <DialogClose asChild className="flex-1">
              <Button variant={"secondary"}>nvm</Button>
            </DialogClose>
            <DialogClose asChild className="flex-1">
              <Button
                onClick={() => {
                  // clear cookie and reload the page
                  deleteCookie("session_token");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer>
      <DrawerTrigger
        asChild
        {...(fullWidth
          ? {
              className: "w-full",
            }
          : {})}
      >
        <Button variant={"outline"}>Logout</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Logout</DrawerTitle>
          <DrawerDescription>
            Are you sure logging out? You can always log back in.
          </DrawerDescription>
        </DrawerHeader>
        <br />
        <div className="flex gap-4 w-full container">
          <DrawerClose asChild className="flex-1">
            <Button variant={"secondary"}>nvm</Button>
          </DrawerClose>
          <DrawerClose asChild className="flex-1">
            <Button
              onClick={() => {
                // clear cookie and reload the page
                deleteCookie("session_token");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </DrawerClose>
        </div>
        <DrawerFooter>
          <DrawerClose />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
