import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">
        <Dashboard searchParams={{ range: "default" }} />
      </h1>
    </main>
  );
}
