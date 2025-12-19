
export function truncate(text: string, length: number) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "…" : text;
}

export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// lib/utils.ts
export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
