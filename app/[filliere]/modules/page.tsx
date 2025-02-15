'use client'
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'

type modules={
    m:string;
}
export default function page() {
    const [response,setResponse]=useState<modules[]>([])
    const params = useParams();
    useEffect(()=>{
        const fetchInfo=async()=>{
            const data = await fetch(`/api/fillieres/${params.filliere}/modules`);
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
        <NavBar filliere={params.filliere}/>
        <div className='container flex flex-col bg-slate-100 '>
        {(()=>{
            const card:ReactNode[]=[];
            if(response){
            response.map(item=>{
                card.push(<Link className='bg-slate-50' href={`/${params.filliere}/modules/${item.m}`} key={item.m}>{item.m}</Link>)
            })
            }
            return card;
        })()}

        </div>
    </div>
    </>
  )
}
