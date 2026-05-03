import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  viewAllHref?: string;
  accent?: boolean;
}

export default function SectionTitle({
  title,
  viewAllHref,
  accent = true,
}: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        {accent && (
          <div className="w-1 h-6 bg-primary rounded-full" />
        )}
        <h2 className="text-lg font-bold text-secondary">{title}</h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-0.5 text-sm font-medium text-primary hover:text-accent transition-colors"
        >
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
