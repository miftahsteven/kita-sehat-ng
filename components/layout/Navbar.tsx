"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Container from "./Container";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <nav className="hidden md:block bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-11">
          <div className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 relative group ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center">
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel kesehatan..."
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary w-52 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Tutup
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                aria-label="Cari artikel"
              >
                <Search className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
