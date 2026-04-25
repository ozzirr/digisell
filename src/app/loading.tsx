export default function Loading() {
  return (
    <main className="min-h-screen px-5 py-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-12 w-40 rounded-full bg-black/10" />
        <div className="mt-20 h-16 max-w-2xl rounded-2xl bg-black/10" />
        <div className="mt-6 h-6 max-w-xl rounded-full bg-black/10" />
        <div className="mt-12 h-96 rounded-[2rem] bg-black/10" />
      </div>
    </main>
  );
}
