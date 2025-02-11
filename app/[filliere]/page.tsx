"use client";

import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
    const params = useParams();
    const [response,setResponse]=useState()

    useEffect(() => {
        const fetchData = async () => {

          const data = await fetch(`/api/fillieres/${params.filliere}`);
          const result = await data.json();
          console.log(result);
          if(result){
              setResponse(result);
          }

          return result;
        };
        fetchData()
      }, []);
    return(
        <>
        <div className="container m-auto">
            <Header/>
            <div className="main bg-slate-300 shadow-xl rounded-lg p-3 ">
                <table className="result-table w-full shadow-2xl border-collapse">
                    <thead className="bg-gray-50 border-b-2 border-gray-200 rounded-lg">
                        <tr className=" table-row  rounded-lg">
                            <th className="p-3 text-sm font-semibold text-left">Nb</th>
                            <th className="p-3 text-sm font-semibold text-left">matricule</th>
                            <th className="p-3 text-sm font-semibold text-left">nom</th>
                            <th className="p-3 text-sm font-semibold text-left">moyenne</th>
                        </tr>
                    </thead>
                    <tbody>
                    {response?.map((value:object, index:number) => (
                        <tr key={index} className="bg-gray-50 border-b-2 border-gray-200">
                        <td className="p-3 text-sm text-gray-700 font-semibold">{index + 1}</td>
                        <td className="p-3 text-sm text-gray-700 font-semibold">{value.mat}</td>
                        <td className="p-3 text-sm text-gray-700 font-semibold">{value.nom}</td>
                        <td className="p-3 text-sm text-gray-700 font-semibold">{value.moy}</td>
                        </tr>
                    )) || []}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
  
}
