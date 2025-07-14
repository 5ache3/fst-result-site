"use client";

import NavBar from "@/components/NavBar";
import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import Selection from "@/components/CustumSelect";

type Filliere = {
  L: string;
  l: string;
};


export default async function Home() {

  const fetchFillieres = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/list`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch fillieres:", error);
    }
  };

  
  const fills:Filliere[] = await fetchFillieres();
  
  return (
    <>
      <div className="container m-auto">
        <NavBar filliere={''}/>
        <div className="main shadow-xl rounded-lg p-3 ">
          <div className="flex justify-around my-5">
            {(() => {
              const fil_options = fills.map(({ L, l }) => ({
                val: l,
                text: L,
              }));

              return <Selection items={fil_options} path="" value="" />;
            })()}
          </div>
          
        </div>
      </div>
    </>
  );
}
