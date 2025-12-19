export default function Partners() {
  return (
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-6">Partners</h2>

      <div className="flex gap-10 overflow-hidden py-6 border rounded-xl bg-muted/40">
        <div className="flex gap-10 animate-[slide_30s_linear_infinite]">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 w-32 bg-slate-300 rounded-md flex items-center justify-center text-xs font-semibold"
            >
              Logo
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
