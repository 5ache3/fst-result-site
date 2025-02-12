'use client'
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'

type matiere={
    n:string
    id:string
    m:string
}
export default function page() {
    const [response,setResponse]=useState<matiere[]>([])
    const params = useParams();
    useEffect(()=>{
        const fetchInfo=async()=>{
            const data = await fetch(`/api/fillieres/${params.filliere}/matieres`);
              const result = await data.json();
              if(result){
                setResponse(result);
              }
        }
        fetchInfo()
    },[params])
  return (
    <>
    <div className='container m-auto'>
        <NavBar/>
        <div className='container flex flex-col bg-slate-100 '>
          
        {(()=>{
            const card:ReactNode[]=[];
            if(response){
            response.map(item=>{
                card.push(<Link className='bg-slate-50' href={`/${params.filliere}/matieres/${item.id}`} key={item.id}>{item.n}</Link>)
            })
            }
            return card;
        })()}

        </div>
    </div>
    </>
  )
}
