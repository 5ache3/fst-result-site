"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    if(query){
      router.push(`/student/${query}`);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-xl shadow-md w-full max-w-xs">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        🔍
      </button>
    </div>
  );
}
