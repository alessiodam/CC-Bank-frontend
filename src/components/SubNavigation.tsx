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
        pathname === href && "bg-primary text-primary-foreground"
      )}
    >
      {children}
    </Link>
  );
}

export default function SubNavigation({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="sticky flex items-center h-10 backdrop-blur-sm z-50 border-b">
      <ul className="flex gap-1 h-full w-full container">
        {links.map(({ href, label }) => (
          <li key={href} className="flex-1 h-full">
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );

  function SubNavigationButton({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <NavLink href={href}>
        <PanelsTopLeft className="h-4 w-4 mr-2" />
        <span>{children}</span>
      </NavLink>
    );
  }
}
