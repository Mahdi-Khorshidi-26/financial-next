import SideNavigation from "./components/sideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <SideNavigation />
      <main className="col-span-3">{children}</main>
    </div>
  );
}
