import NavBar from "@/components/NavBar";
import Link from "next/link";

type PersonResult={
    mat:string,
    nom:string,
    nt:number
    nd:number
    ne:number
    nf:number
    mo:number
}

export default async function Page({params,searchParams}: {params: { filliere: string,matiere:string },searchParams:Promise<{ [key: string]: string | undefined }>}) {
  const resolvedParams = await searchParams;
  const sort = await resolvedParams.sort;
  const order = await resolvedParams.order;
  const page = Number( await resolvedParams.page ?? 1);
  const limit=Number(process.env.NEXT_PUBLIC_QUERY_LIMIT||20);
    const {filliere,matiere} = params;

    let response:PersonResult[]=[]

    let nb = 0;
    let tp=0;
    const fetchInfo=async()=>{
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/${filliere}/matieres/${matiere}/info`);
          const result = await data.json();
          if(result){
          //   setInfo(result[0]);
              nb=result[0].nb
              tp=result[0].moy_t
          }
    }

    const fetchData = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/${filliere}/matieres/${matiere}?sort=${sort}&order=${order}&page=${page}`);
      const result = await data.json();
      if(result){
          response=result;
      }
      return result;
    };

    const ordering=(by:string,ind:number)=>{
    if(sort==by&&order=='desc'){
        return 'asc'
    }
    if(sort==by&&order=='asc'){
        return 'desc'
    }
    if(ind==0){
        return'asc'
    }
    return'desc'        
    }
    const sortingColumn=(by:string)=>{
    if((sort==null || sort=='null')&& by=='nf'){
        return 'sort-desc';
        }
    if(sort!=by){
        return ''
    }
    if(order=='desc'){
        return 'sort-desc'
    }
    return 'sort-asc'
    }
    
    await fetchInfo();
    await fetchData();
    
    
    return(
        <>
        <div className="container m-auto">
            <NavBar filliere={filliere}/>
            <div className="main shadow-xl rounded-lg p-3 px-1 ">
                <table className="matieres-table result-table w-full shadow-xl border-collapse">
                    <thead className="bg-gray-50 border-b-2 border-gray-200 rounded-lg">
                        <tr className=" table-row  rounded-lg">
                            <th className="p-3 px-1 text-xs md:text-sm font-semibold text-left">Nb</th>
                            <th className="text-xs md:text-sm font-semibold text-left" >
                                <Link href={`?sort=mat&order=${ordering('mat',0)}&page=1`}
                                className={`p-3 px-1 ${sortingColumn('mat')}`}
                                >matricule</Link></th>
                            <th className="text-xs md:text-sm font-semibold text-left">
                                <Link href={`?sort=nom&order=${ordering('nom',0)}&page=1`}
                                className={`p-1 sm:p-3 px-1 pr-12 ${sortingColumn('nom')}`}
                                >nom</Link></th>
                            <th className="text-xs md:text-sm font-semibold text-left">
                                <Link href={`?sort=mo&order=${ordering('mo',1)}&page=1`}
                                className={`p-1 md:p-3 px-1 ${sortingColumn('mo')}`}
                                >moyenne</Link></th>
                                {(()=>{
                                    if(tp>0){
                                        return(<th className="text-xs md:text-sm font-semibold text-left">
                                            <Link href={`?sort=nt&order=${ordering('nt',1)}&page=1`}
                                            className={`p-3 px-1 ${sortingColumn('nt')}`}
                                            >tp</Link></th>)
                                    }
                                })()}
                            <th className="text-xs md:text-sm font-semibold text-left">
                                <Link href={`?sort=nd&order=${ordering('nd',1)}&page=1`}
                                className={`p-3 px-1 ${sortingColumn('nd')}`}
                                >devoir</Link></th>
                            <th className="text-xs md:text-sm font-semibold text-left">
                                <Link href={`?sort=ne&order=${ordering('ne',1)}&page=1`}
                                className={`p-3 px-1 ${sortingColumn('ne')}`}
                                >examen</Link></th>
                            <th className="text-xs md:text-sm font-semibold text-left">
                                <Link href={`?sort=nf&order=${ordering('nf',1)}&page=1`}
                                className={`p-3 px-1 ${sortingColumn('nf')}`}
                                >final</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                    {response.map((value:PersonResult, index:number) => (
                        <tr key={index} className="bg-gray-50 border-b-2 border-gray-200">
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold">{(page-1)*limit+index + 1}</td>
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold"><Link href={`/student/${value.mat}`} className=' hover:text-blue-400'>{value.mat}</Link></td>
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold"><Link href={`/student/${value.mat}`} className=' hover:text-blue-400'>{value.nom}</Link></td>
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold">{value.mo}</td>
                        {(()=>{if(tp>0){
                                        return(
                                            <td className="p-3 px-1 text-xs text-gray-700 font-semibold">{value.nt}</td>
                                        )}})()}
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold">{value.nd}</td>
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold">{value.ne}</td>
                        <td className="p-3 px-1 text-xs text-gray-700 font-semibold">{value.nf}</td>
                        </tr>
                    )) || []}
                    </tbody>
                </table>
                <div className="pagination text-black text-sm mt-3 shadow-xl rounded-md ">
                  <div className="p-3 text-lg font-semibold text-center text-gray-400">
                      Page <span className="text-black">{page} </span>
                       OF <span className="text-black">{Math.ceil(nb/limit)}</span>
                  </div>
                  <div className="w-full py-3 rounded-md  flex justify-evenly max-w-md lg:p-5 gap-1 m-auto">
                    {(()=>{
                        const pages=[];
                        if(page>1){
                            pages.push(
                            <Link href={`?sort=${sort}&order=${order}&page=${1}`} className="flex justify-around flex-col h-15 px-2 md:px-3 w-ful bg-white rounded-xl font-medium shadow-xl drop-shadow-lg" key="first">first</Link>,
                            <Link href={`?sort=${sort}&order=${order}&page=${page-1}`} className="sm:ml-[1px] flex justify-around flex-col h-15 px-2 md:px-3 bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="previous">previous</Link>
                        )}else{
                            pages.push(<div  className="disabled-button sm:ml-[1px] py-3  px-2 md:px-3 w-full text-center bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="firste">First</div>,
                                <div  className="disabled-button ml-[1px] py-3  px-2 w-full text-center md:px-3 bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="previous">Previous</div>)
                        }
                    const nbPages=Math.ceil(nb/limit);
                    const start=Math.max(1,page-2);
                    const end = Math.min(nbPages,start+4)

                    for(let i=start;i<=end;i++){
                        if(page===i){
                            pages.push(
                                <Link href={`?sort=${sort}&order=${order}&page=${i}`} className="current-page sm:ml-[1px] flex justify-around flex-col h-15 px-3 md:px-3 w-full text-center bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key={i}>{i}</Link>
                            )
                        }else{
                            pages.push(
                                <Link href={`?sort=${sort}&order=${order}&page=${i}`} className="sm:ml-[1px] flex justify-around flex-col h-15 px-3 md:px-3 w-full text-center bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key={i}>{i}</Link>
                            )
                        }
                    }
                    if(page<nbPages){
                        pages.push(<Link href={`?sort=${sort}&order=${order}&page=${page+1}`} className="sm:ml-[1px] py-3  px-2 md:px-3 w-full text-center bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="next">Next</Link>,
                            <Link href={`?sort=${sort}&order=${order}&page=${Math.ceil(nb/limit)}`} className="ml-[1px] py-3  px-2 w-full text-center md:px-3 bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="last">Last</Link>)
                        }else{
                        pages.push(<div  className="disabled-button sm:ml-[1px] py-3  px-2 md:px-3 w-full text-center bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="next">Next</div>,
                            <div  className="disabled-button ml-[1px] py-3  px-2 w-full text-center md:px-3 bg-white rounded-xl font-medium shadow-xl drop-shadow-lg " key="last">Last</div>)
                    }
                        return pages;
                    })()}
                  </div>
                </div>
            </div>
        </div>
        </>
    );
  
}
