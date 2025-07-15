
import Selection from '@/components/CustumSelect';
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import {ReactNode} from 'react'

type modules={
    m:string;
}

type Filliere = {
  L: string;
  l: string;
}

export default async function page({params}: {params: { filliere: string }}) {
  const {filliere} = await params;
  let response:modules[]=[]
  let fills:Filliere[]=[]

  const fetchFillieres = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/list`);
      const data = await response.json();
      fills=data
    } catch (error) {
      console.error("Failed to fetch fillieres:", error);
    }
  };

  const fetchInfo=async()=>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/${filliere}/modules`);
    const result = await data.json();
    if(result){
      response=result;
    }
  }
  await fetchFillieres();
  await fetchInfo()
  
  
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

                  return <Selection items={fil_options} path="" value={filliere} sufix='modules' />;
              })()}
          </div>

          <div className='flex flex-col text-black bg-slate-100 '>
            {(()=>{
                const card:ReactNode[]=[];
                if(response){
                response.map(item=>{
                    card.push(
                      <div className='p-2 bg-slate-50 text-lg border-gray-10 border-b-2' key={item.m}>
                        <Link className='hover:text-blue-400' href={`/${filliere}/modules/${item.m}`} key={item.m}>{item.m}
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
