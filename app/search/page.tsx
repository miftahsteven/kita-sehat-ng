"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Container from "@/components/layout/Container";
import ArticleCard from "@/components/article/ArticleCard";
import { Article, getArticles, ArticleFilters } from "@/lib/utils";
import { 
  Search, 
  X, 
  Loader2, 
  Filter, 
  Calendar, 
  Tag, 
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { categories } from "@/data/categories";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL Params
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "";
  const sDate = searchParams.get("startDate") || "";
  const eDate = searchParams.get("endDate") || "";
  const sortBy = (searchParams.get("sort") as any) || "latest";
  const currPage = parseInt(searchParams.get("page") || "1");

  // Local State
  const [inputValue, setInputValue] = useState(q);
  const [results, setResults] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const filters: ArticleFilters = {
        search: q,
        category: cat,
        startDate: sDate,
        endDate: eDate,
        sort: sortBy,
        page: currPage,
        limit: 12
      };
      
      const { articles, meta } = await getArticles(filters);
      setResults(articles);
      setPagination(meta);
      setIsLoading(false);
    }
    fetchData();
  }, [q, cat, sDate, eDate, sortBy, currPage]);

  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });
    
    // Reset page on filter change
    if (!newFilters.page) params.delete("page");
    
    router.push(`/search?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: inputValue, page: null });
  };

  const handleClearAll = () => {
    setInputValue("");
    router.push("/search");
  };

  const dateFilters = [
    { label: "Semua Waktu", start: "", end: "" },
    { label: "Hari Ini", start: new Date().toISOString().split('T')[0], end: "" },
    { label: "Minggu Ini", start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], end: "" },
    { label: "Bulan Ini", start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], end: "" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Search Header Section */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 text-center">
              Eksplor Artikel Kesehatan
            </h1>
            <p className="text-slate-500 text-center mb-8">
              Temukan informasi kesehatan terpercaya untuk Anda dan keluarga.
            </p>
            
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-cyan-500/5 border border-slate-200 group-focus-within:border-primary group-focus-within:ring-4 group-focus-within:ring-primary/5 transition-all p-1.5">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Cari topik kesehatan (misal: diet, kalsium, mental health)..."
                  className="flex-1 py-3 px-2 outline-none text-slate-700 font-medium placeholder:text-slate-400"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95"
                >
                  Cari
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Populer:</span>
              {["Diabetes", "Gizi", "Olahraga", "Stres"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setInputValue(tag);
                    updateFilters({ q: tag, page: null });
                  }}
                  className="text-sm text-slate-600 bg-white border border-slate-200 px-4 py-1.5 rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-4">
                <Tag size={18} className="text-primary" />
                <span>Kategori</span>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => updateFilters({ category: "" })}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${!cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  Semua Kategori
                </button>
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => updateFilters({ category: category.slug })}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${cat === category.slug ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-4">
                <Calendar size={18} className="text-primary" />
                <span>Waktu Publikasi</span>
              </div>
              <div className="space-y-1">
                {dateFilters.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => updateFilters({ startDate: f.start, endDate: f.end })}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${sDate === f.start ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button 
                onClick={handleClearAll}
                className="w-full py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
              >
                Reset Semua Filter
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold"
                >
                  <Filter size={16} />
                  Filter
                </button>
                <div className="text-sm text-slate-500">
                  Menampilkan <span className="text-slate-900 font-bold">{pagination?.total || 0}</span> artikel
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={16} className="text-slate-400" />
                  <select 
                    value={sortBy}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="latest">Terbaru</option>
                    <option value="popular">Terpopuler</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters (Collapsible) */}
            {showFilters && (
              <div className="lg:hidden mb-8 p-6 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in slide-in-from-top duration-300">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Kategori</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => updateFilters({ category: "" })}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${!cat ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
                    >
                      Semua
                    </button>
                    {categories.map((c) => (
                      <button 
                        key={c.slug}
                        onClick={() => updateFilters({ category: c.slug })}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${cat === c.slug ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Waktu</h4>
                  <div className="flex flex-wrap gap-2">
                    {dateFilters.map((f) => (
                      <button 
                        key={f.label}
                        onClick={() => updateFilters({ startDate: f.start, endDate: f.end })}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${sDate === f.start ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm"
                >
                  Terapkan Filter
                </button>
              </div>
            )}

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-slate-100 p-4 space-y-4 animate-pulse">
                    <div className="aspect-video bg-slate-100 rounded-2xl" />
                    <div className="h-4 bg-slate-100 rounded w-1/4" />
                    <div className="h-6 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-200 border-dashed">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak ditemukan artikel</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Coba gunakan kata kunci lain atau ubah filter pencarian Anda.
                </p>
                <button 
                  onClick={handleClearAll}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Hapus Semua Filter
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.lastPage > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={currPage === 1}
                  onClick={() => updateFilters({ page: (currPage - 1).toString() })}
                  className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:border-primary hover:text-primary disabled:opacity-50 transition-all bg-white shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(pagination.lastPage)].map((_, i) => {
                  const p = i + 1;
                  // Simple pagination logic: show current, first, last, and neighbors
                  if (
                    p === 1 || 
                    p === pagination.lastPage || 
                    (p >= currPage - 1 && p <= currPage + 1)
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => updateFilters({ page: p.toString() })}
                        className={`w-12 h-12 rounded-xl text-sm font-bold transition-all shadow-sm ${currPage === p ? "bg-primary text-white shadow-primary/20" : "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary"}`}
                      >
                        {p}
                      </button>
                    );
                  }
                  if (p === currPage - 2 || p === currPage + 2) {
                    return <span key={p} className="text-slate-300 px-1">...</span>;
                  }
                  return null;
                })}

                <button
                  disabled={currPage === pagination.lastPage}
                  onClick={() => updateFilters({ page: (currPage + 1).toString() })}
                  className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:border-primary hover:text-primary disabled:opacity-50 transition-all bg-white shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Memuat...</div>}>
      <SearchContent />
    </Suspense>
  );
}
