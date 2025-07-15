
import Selection from '@/components/CustumSelect';
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import React, { ReactNode, } from 'react'

type matiere={
    n:string
    id:string
    m:string
}
type Filliere = {
  L: string;
  l: string;
};

export default async function page({params}: {params: { filliere: string,matiere:string }}) {
    
    let response:matiere[]=[]
    let fills:Filliere[]=[];
    const {filliere} = await params;
    
    const fetchFillieres = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/list`);
        const data = await response.json();
        fills=data;
      } catch (error) {
        console.error("Failed to fetch fillieres:", error);
      }
    };
    
    const fetchInfo=async()=>{
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/${filliere}/matieres`);
          const result = await data.json();
          if(result){
            response=result;
          }
    }

    await fetchInfo();
    await fetchFillieres();
      
  
  return (
    <>
    <div className='container m-auto'>
        <NavBar filliere={filliere}/>
        <div className="main shadow-xl rounded-lg p-3 ">
          <div className="flex justify-around my-5">
              {(() => {
                  const fil_options = fills.map(({ L, l }) => ({
                      val: l,
                      text: L,
                  }));

                  return <Selection items={fil_options} path="" value={filliere} sufix='matieres' />;
                  })()}
          </div>
          <div className='flex flex-col text-black'>
            {(()=>{
                const card:ReactNode[]=[];
                if(response){
                response.map(item=>{
                    card.push(
                      <div key={item.id} className='p-3 flex gap-20 font-semibold border-t-2 '>
                        <Link 
                          href={`/${filliere}/modules/${item.m}`}
                          className='hover:text-blue-400'
                          >{item.m}</Link>
                        <Link className=' hover:text-blue-400' href={`/${filliere}/matieres/${item.id}`} 
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
