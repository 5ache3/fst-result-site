'use client';                       
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Selection({items,path,value,sufix}:{items:{val:string,text:string}[],path:string,value:string,sufix?:string}) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
        let url;
        if(sufix){
            url=`${path}/${encodeURIComponent(value)}/${sufix}`
        }else{
            url=`${path}/${encodeURIComponent(value)}`
        }
        router.push(url);
    };
    return (
    <select 
        onChange={handleChange}
        defaultValue={value}
        className='m-auto w-70 h-8 rounded-md px-2 border-none shadow-2xl border-2 bg-gray-300 dark:bg-gray-800'>
        <option value="">
        ALL ({items.length})
        </option>
        {items.map((item:any) => (
            <option key={item.val} value={item.val} className='text-black'>
            {item.text}
            </option>
        ))}
    </select>
    )
}
