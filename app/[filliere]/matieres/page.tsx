'use client'
import Loading from '@/components/Loading';
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'

type matiere={
    n:string
    id:string
    m:string
}
type Filliere = {
  L: string;
  l: string;
};

export default function page() {
  const [loading,setLoading]=useState(true)
    const [response,setResponse]=useState<matiere[]>([])
    const params = useParams();
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
            const data = await fetch(`/api/fillieres/${params.filliere}/matieres`);
              const result = await data.json();
              if(result){
                setResponse(result);
              }
        }
        fetchInfo();
    },[params])

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
          router.push(`/${selectedValue}/matieres`);
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
              value={params.filliere}
              onChange={handleChange}
              className="p-3 my-5 w-64 border border-gray-600 bg-slate-200 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value=''>ALL</option>
              {fills.map((fil) => (
                <option key={fil.l} value={fil.l}>
                  {fil.L}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col text-black'>
            {(()=>{
                const card:ReactNode[]=[];
                if(response){
                response.map(item=>{
                    card.push(
                      <div key={item.id} className='p-3 flex gap-20 font-semibold border-t-2 '>
                        <Link 
                          href={`/${params.filliere}/modules/${item.m}`}
                          className='hover:text-blue-400'
                          >{item.m}</Link>
                        <Link className=' hover:text-blue-400' href={`/${params.filliere}/matieres/${item.id}`} 
                          key={item.id}
                          >{item.n}
                        </Link>
                      </div>
                      )})
                  
                  }
                return card;
            })()}
          </div>
        </div>

    </div>
    </>
  )
}
