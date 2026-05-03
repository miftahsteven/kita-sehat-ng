import { Search } from "lucide-react";

interface EmptyStateProps {
  query?: string;
  title?: string;
  description?: string;
}

export default function EmptyState({
  query,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Search className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-secondary mb-2">
        {title || (query ? `Tidak ada hasil untuk "${query}"` : "Tidak ada artikel")}
      </h3>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
        {description ||
          "Coba gunakan kata kunci lain atau jelajahi artikel dari kategori yang tersedia."}
      </p>
    </div>
  );
}
