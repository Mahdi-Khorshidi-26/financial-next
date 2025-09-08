import PageHeader from "@/components/pageHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <PageHeader className="my-8" />
      <div>{children}</div>
      <footer className="mt-auto text-center py-8">Footer</footer>
    </div>
  );
}
