'use client'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import { Metadata } from 'next'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type MatiereData={
    mat_n: string
    mod_n: string
    nt: number
    nd: number
    ne: number
    nf: number
    r: string
    d:string
}

type ModuleData={
    n : string
    m : number
    d:string
}

type InfoCard={
    name: string,
    mat: string,
    fil:string,
    filliere: string,
    a: string,
    d: string,
    moyenne: number
}

export default function page() {
    const [loading, setLoading] = useState(true);
    const params=useParams();
    const [matiereRes,setMatiereRes]=useState<MatiereData[]>([])
    const [moduleRes,setModuleRes]=useState<ModuleData[]>([])
    const [info,setInfo]=useState<InfoCard>()
    useEffect(()=>{
        const fetchInfo = async ()=>{
            const data = await fetch(`/api/person/${params.id}/info`);
            const result = await data.json();
            if(result){
                setInfo(result[0]);
                setLoading(false)
            }

        };
        const fetchData = async ()=>{
            const data = await fetch(`/api/person/${params.id}`);
            const result = await data.json();
            if(result){
                setLoading(false)
                setMatiereRes(result[0]);
                setModuleRes(result[1]);
            }
        }
        fetchInfo()
        fetchData()
    },[])
    if (loading) {
        return <Loading/>
    }
  return (
    <>
    <div  className="container m-auto">
        <div className='main m-auto max-w-screen-lg p-2'>
            <NavBar filliere={info?.fil}/>
            <div className='m-auto builtin p-1 bg-slate-200'>
            <div className='builtin-header pr-3 pl-4'>
                <table>
                    <tbody>
                        <tr className='lg:text-md font-semibold '>                                
                            <td className='p-1 text-black nom w-full '>Nom </td>
                            <td className='flex gap-1'>
                            <div className=' w-10 text-center text-black md:w-20 md:h-15 text-wrap py-2 '>Note Tp</div>
                            <div className=' w-10 text-center text-black md:w-20 md:h-15  py-2 '>Note Devoir</div>
                            <div className=' w-10 text-center text-black md:w-20 md:h-15  py-2 '>Note Examen</div>
                            <div className=' w-10 text-center text-black md:w-20 md:h-15  text-wrap py-2 '>Note Finale</div>
                            <div className=' w-10 text-center text-black md:w-20 md:h-15  text-clip py-2'><span className=' hidden md:block'>Observation</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {moduleRes.map((item)=>(
                <div className='p-1 pt-1' key={item.n}>
                <div className='bg-slate-100 rounded-md p-1 shadow-xl'>
                    <div className='matieres bg-slate-50 rounded-md shadow-xl'>
                        <table>
                            <tbody>
                        {matiereRes
                            .filter((matiere) => matiere.mod_n === item.n)
                            .map((mat) => (
                                <tr key={mat.r} className='text-xs font-semibold md:text-lg border-b-2'>                                
                                    <td className='p-1 nom w-full '><Link href={`/${info?.fil}/matieres/${mat.r}`} className='text-blue-950 hover:underline hover:text-blue-400'>{mat.mat_n}</Link></td>
                                    <td className='flex gap-1'>
                                    <div className=' w-10 text-center text-black md:w-20 h-10 md:h-15 py-2 '>{mat.nt}</div>
                                    <div className=' w-10 text-center text-black md:w-20 h-10 md:h-15 py-2 '>{mat.nd}</div>
                                    <div className=' w-10 text-center text-black md:w-20 h-10 md:h-15 py-2 '>{mat.ne}</div>
                                    <div className=' w-10 text-center text-black md:w-20 h-10 md:h-15 py-2 '>{mat.nf}</div>
                                    <div className=' w-10 md:w-20 text-black text-center md:w-15 h-10 md:h-15 py-2 '>{mat.d}</div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='m-2 flex justify-evenly text-xs md:text-lg'>
                        <div className='text-black'><span className='text-gray-500'> Module: </span><Link href={`/${info?.fil}/modules/${item.n}`} className='text-blue-950 hover:underline hover:text-blue-400'> {item.n}</Link></div>
                        <div className='text-black'><span className='text-gray-500'> Moyenne: </span> {item.m}</div>
                        <div className='text-black'><span className='text-gray-500'> Observations: </span> {item.d}</div>
                    </div>
                </div>
                </div>
            ))}
            </div>
            <div className='card mt-2 m-auto max-w-[500px] bg-slate-100
             rounded-lg shadow-2xl text-sm font-sans font-semibold p-5'>
                <div className='elements flex flex-col text-black'>
                        <div>
                            <span className='text-gray-500'> Matricule:</span> {info?.mat}
                        </div>
                        <div>
                            <span className='text-gray-500'> Nom:</span> {info?.name}
                        </div>
                        <div>
                            <span className='text-gray-500'> Filliere:</span><Link href={`/${info?.fil}`} className='hover:underline hover:text-blue-400'>{info?.filliere}</Link> 
                        </div>
                        <div>
                            <span className='text-gray-500'> Moyenne:</span> {info?.moyenne}
                        </div>
                        <div>
                            <span className='text-gray-500'> Observation:</span> {info?.d}
                        </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
