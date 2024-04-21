import SubNavigation from "@/components/SubNavigation";
import { PanelsTopLeft, ShoppingCart } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNavigation
        links={[
          { href: "/dashboard", label: "Dashboard", icon: PanelsTopLeft },
          {
            href: "/dashboard/clickncollect",
            label: "Click n Collect",
            icon: ShoppingCart,
          },
        ]}
      />
      {children}
    </>
  );
}
