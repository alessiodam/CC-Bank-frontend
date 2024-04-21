"use client";

import { cn } from "@/lib/utils";
import { PanelsTopLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "h-full w-full flex items-center px-2 py-0 text-sm",
        pathname === href && "bg-primary text-primary-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export default function SubNavigation() {
  return (
    <div className="sticky flex items-center h-10 backdrop-blur-sm z-50 border-b">
      <ul className="flex gap-1 h-full w-full container">
        <li className="h-full">
          <NavLink href="/dashboard">
            <PanelsTopLeft className="h-4 w-4 mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink href="/dashboard/clickncollect">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Click n Collect
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
