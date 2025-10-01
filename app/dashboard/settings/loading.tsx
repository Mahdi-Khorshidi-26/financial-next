import Skeleton from "@/components/skeleton";

export default async function Loading() {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">
        <Skeleton />
      </h1>
      <Skeleton />
    </>
  );
}
