export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <main>
      <div className="mt-8">{children}</div>
    </main>
  );
}
