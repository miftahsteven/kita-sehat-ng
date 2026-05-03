import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  categorySlug: string;
  size?: "sm" | "md";
  className?: string;
  noLink?: boolean;
}

export default function CategoryBadge({
  category,
  categorySlug,
  size = "sm",
  className,
  noLink = false,
}: CategoryBadgeProps) {
  const styles = cn(
    "category-badge hover:bg-primary/20 transition-colors duration-150",
    size === "md" ? "text-sm px-3 py-1.5" : "text-[11px] px-2.5 py-1",
    className
  );

  if (noLink) {
    return <span className={styles}>{category}</span>;
  }

  return (
    <Link href={`/category/${categorySlug}`} className={styles}>
      {category}
    </Link>
  );
}

