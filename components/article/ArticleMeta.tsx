import { Clock, CalendarDays, User, Eye } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface ArticleMetaProps {
  author: string;
  publishedAt: string;
  readingTime: string;
  viewCount?: number;
  className?: string;
  compact?: boolean;
}

export default function ArticleMeta({
  author,
  publishedAt,
  readingTime,
  viewCount = 0,
  className = "",
  compact = false,
}: ArticleMetaProps) {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 text-xs text-gray-400 flex-wrap ${className}`}>
        <span>{formatDateShort(publishedAt)}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" /> {viewCount}
        </span>
        <span>·</span>
        <span>{readingTime} baca</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 text-sm text-gray-500 flex-wrap ${className}`}>
      <div className="flex items-center gap-1.5">
        <User className="w-3.5 h-3.5 text-primary" />
        <span>{author}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <CalendarDays className="w-3.5 h-3.5 text-primary" />
        <span>{formatDateShort(publishedAt)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-primary" />
        <span>{viewCount} views</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span>{readingTime} baca</span>
      </div>
    </div>
  );
}

