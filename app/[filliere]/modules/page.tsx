'use client'
import Loading from '@/components/Loading';
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'

type modules={
    m:string;
}

type Filliere = {
  L: string;
  l: string;
}

export default function page() {
    const [response,setResponse]=useState<modules[]>([])
    const params = useParams();
    const [loading,setLoading]=useState(true)
    const [fills, setFills] = useState<Filliere[]>([]);
    const router = useRouter();

    const fetchFillieres = async () => {
      try {
        const response = await fetch("/api/fillieres/list");
        const data = await response.json();
        setFills(data);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch fillieres:", error);
      }
    };
    useEffect(()=>{
      fetchFillieres()
    },[])
    
    useEffect(()=>{
        const fetchInfo=async()=>{
            const data = await fetch(`/api/fillieres/${params.filliere}/modules`);
              const result = await data.json();
              if(result){
                setResponse(result);
                setLoading(false)
              }
        }
        fetchInfo()
    },[params])

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      if (selectedValue) {
        router.push(`/${selectedValue}/modules`);
      }
    };
    if (loading) {
      return <Loading/>
    }
  return (
    <>
    <div className='container m-auto'>
        <NavBar filliere={params.filliere}/>
        <div className="main shadow-xl rounded-lg p-3 ">
          <div className="flex justify-around">
            <select
              onChange={handleChange}
              value={params.filliere}
              className="p-3 my-5 w-64 border border-gray-600 bg-slate-200 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value=''>All</option>
              {fills.map((fil) => (
                <option key={fil.l} value={fil.l}>
                  {fil.L}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col bg-slate-100 '>
            {(()=>{
                const card:ReactNode[]=[];
                if(response){
                response.map(item=>{
                    card.push(
                      <div className='p-2 bg-slate-50 text-lg border-gray-10 border-b-2' key={item.m}>
                        <Link className='hover:text-blue-400' href={`/${params.filliere}/modules/${item.m}`} key={item.m}>{item.m}
                        </Link>
                      </div>
                  )})}
                return card;
            })()}
          </div>
        </div>
    </div>
    </>
  )
}
