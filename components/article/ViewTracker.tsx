"use client";

import { useEffect } from "react";
import { incrementArticleView } from "@/lib/utils";

interface ViewTrackerProps {
  articleId: string;
}

export default function ViewTracker({ articleId }: ViewTrackerProps) {
  useEffect(() => {
    if (articleId) {
      incrementArticleView(articleId);
    }
  }, [articleId]);

  return null; // This component doesn't render anything
}
