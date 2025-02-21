"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";         // 
import { Search, X } from "lucide-react"; // Lightweight icons

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return; // Prevent empty searches
    if (onSearch) onSearch(query);
    router.push(`/student/${query}`);
  };

  const clearInput = () => setQuery("");

  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg w-full max-w-sm p-2 border border-gray-300">
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 text-black border-none outline-none bg-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
        aria-label="Search students"
      />
      {query && (
        <button
          onClick={clearInput}
          className="p-1 rounded-full text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Search"
      >
        <Search size={22} />
      </button>
    </div>
  );
}
