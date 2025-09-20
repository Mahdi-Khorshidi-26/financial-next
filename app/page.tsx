import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">
        <Login />
      </h1>
    </main>
  );
}
