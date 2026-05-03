"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Container from "@/components/layout/Container";
import ArticleListItem from "@/components/article/ArticleListItem";
import EmptyState from "@/components/common/EmptyState";
import { searchArticles } from "@/lib/utils";
import { Article } from "@/data/dummyArticles";
import { Search, X } from "lucide-react";
import { categories } from "@/data/categories";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      const found = searchArticles(query);
      setResults(found);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
      setQuery(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
    setQuery("");
    router.push("/search");
  };

  return (
    <div className="py-6 md:py-10">
      <Container>
        {/* Search header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl font-bold text-secondary mb-5 text-center">
            Cari Artikel Kesehatan
          </h1>
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Cari artikel, tips kesehatan, kategori..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button type="submit" className="btn-primary px-5 py-3.5">
              Cari
            </button>
          </form>

          {/* Quick category links */}
          {!hasSearched && (
            <div className="mt-5">
              <p className="text-xs text-gray-400 mb-3 text-center">Jelajahi berdasarkan kategori:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setInputValue(cat.name);
                      setQuery(cat.name);
                      router.push(`/search?q=${encodeURIComponent(cat.name)}`);
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-secondary">
                {results.length > 0 ? (
                  <>
                    <span className="text-primary">{results.length}</span> artikel ditemukan
                    {query && <span className="text-gray-400 font-normal"> untuk &ldquo;{query}&rdquo;</span>}
                  </>
                ) : (
                  "Hasil Pencarian"
                )}
              </h2>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
                {results.map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )}
          </div>
        )}

        {/* No search yet — show all articles hint */}
        {!hasSearched && (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <p className="text-gray-400 text-sm">
              Masukkan kata kunci untuk mencari artikel kesehatan.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Memuat...</div>}>
      <SearchContent />
    </Suspense>
  );
}
