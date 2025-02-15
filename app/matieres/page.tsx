"use client";

import NavBar from "@/components/NavBar";
import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

type Filliere = {
  L: string;
  l: string;
};


export default function Home() {
  const [fills, setFills] = useState<Filliere[]>([]);
  
  const router = useRouter();

  const fetchFillieres = async () => {
    try {
      const response = await fetch("/api/fillieres/list");
      const data = await response.json();
      setFills(data);
    } catch (error) {
      console.error("Failed to fetch fillieres:", error);
    }
  };

  useEffect(() => {
    fetchFillieres();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      router.push(`/${selectedValue}/matieres`);
    }
  };

  return (
    <>
      <div className="container m-auto">
        <NavBar filliere={''}/>
        <div className="main shadow-xl rounded-lg p-3 ">
          <div className="flex justify-around">
            <select
              onChange={handleChange}
              className="p-3 my-5 w-64 border border-gray-600 bg-slate-200 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {fills.map((fil) => (
                <option key={fil.l} value={fil.l}>
                  {fil.L}
                </option>
              ))}
            </select>
          </div>
          
        </div>
      </div>
    </>
  );
}
