import SubNavigation from "@/components/SubNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNavigation
        links={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/clickncollect", label: "Click n Collect" },
        ]}
      />
      {children}
    </>
  );
}
