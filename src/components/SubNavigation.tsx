"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
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
  links: { href: string; label: string; icon: LucideIcon }[];
}) {
  return (
    <div className="sticky flex items-center h-10 backdrop-blur-sm z-50 border-b">
      <ul className="flex gap-1 h-full w-full container">
        {links.map(({ href, label, icon }) => (
          <li key={href} className="h-full">
            <SubNavigationButton href={href} Icon={icon}>
              {label}
            </SubNavigationButton>
          </li>
        ))}
      </ul>
    </div>
  );

  function SubNavigationButton({
    href,
    children,
    Icon,
  }: {
    href: string;
    children: React.ReactNode;
    Icon: LucideIcon;
  }) {
    return (
      <NavLink href={href}>
        <Icon className="h-4 w-4 mr-2" />
        <span>{children}</span>
      </NavLink>
    );
  }
}
