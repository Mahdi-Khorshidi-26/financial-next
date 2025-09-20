import Skeleton from "@/components/skeleton";

export default function LoadingForMainPage() {
  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center mb-8 top-0 z-10 ">
        <Skeleton />
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Skeleton />

        <Skeleton />

        <Skeleton />

        <Skeleton />
      </section>
      <section className="flex justify-between items-center mb-8 sticky top-0 z-10 ">
        <Skeleton />
      </section>

      <Skeleton />
    </main>
  );
}
