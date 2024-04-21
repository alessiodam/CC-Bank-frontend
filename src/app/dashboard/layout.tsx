import SubNavigation from "@/components/SubNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNavigation />
      {children}
    </>
  );
}
