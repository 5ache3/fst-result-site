
import Selection from "@/components/CustumSelect";
import NavBar from "@/components/NavBar";
import Link from "next/link";
type PersonResult={
    mat:string,
    nom:string,
    moy:number
}
type Infocard={
    filliere:string,
    nb:number
    avarage:number
}
type Filliere = {
    L: string;
    l: string;
};

export default async function Page({params,searchParams,}: {params: { filliere: string };  searchParams: { [key: string]: string | undefined };}) {
  const sort = searchParams.sort;
  const order = searchParams.order;
  const page = Number(searchParams.page ?? 1);
  const limit=Number(process.env.NEXT_PUBLIC_QUERY_LIMIT||20);

    const {filliere}= params;
    let response:PersonResult[]=[]
    let nb =0;
    let fills:Filliere[]=[]
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
          const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/${filliere}/info`);
            const result = await data.json();
            if(result){
              //   setInfo(result[0]);
              nb=result[0].nb
            }
      }
      const fetchData = async () => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fillieres/${filliere}?sort=${sort}&order=${order}&page=${page}`);
        const result = await data.json();
        if(result){
            response=result;
        }
        return result;
      };

    await fetchFillieres()
    await fetchInfo()
    await fetchData()

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
        if((sort==null || sort=='null')&& by=='moy'){
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
            
    return(
        <>
        <div className="container m-auto">
            <NavBar filliere={filliere}/>
            <div className="main shadow-xl rounded-lg p-3 ">
                <div className="flex justify-around my-5">
                    {(() => {
                        const fil_options = fills.map(({ L, l }) => ({
                            val: l,
                            text: L,
                        }));

                        return <Selection items={fil_options} path="" value={filliere} />;
                        })()}
                </div>
                <table className="result-table w-full shadow-xl border-collapse">
                    <thead className="bg-gray-50 border-b-2 border-gray-200 rounded-lg">
                        <tr className=" table-row">
                            <th className="p-3 text-sm font-semibold text-left">Nb</th>
                            <th className="text-sm font-semibold text-left" >
                                <Link href={`?sort=mat&order=${ordering('mat',0)}&page=1`}
                                className={`p-3 ${sortingColumn('mat')}`}
                                >matricule</Link></th>
                            <th className="text-sm font-semibold text-left">
                                <Link href={`?sort=nom&order=${ordering('nom',0)}&page=1`}
                                className={`p-3 pr-12 ${sortingColumn('nom')}`}
                                >nom</Link></th>
                            <th className="text-sm font-semibold text-left">
                                <Link href={`?sort=moy&order=${ordering('moy',1)}&page=1`}
                                className={`p-3 ${sortingColumn('moy')}`}
                                >moyenne</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                    {response.map((value:PersonResult, index:number) => (
                        <tr key={index} className="bg-gray-50 border-b-2 border-gray-200">
                        <td className="p-3 text-sm text-gray-700 font-semibold">{(page-1)*limit+index + 1}</td>
                        <td className="p-3 text-sm text-gray-700 font-semibold"><Link href={`/student/${value.mat}`} className='hover:underline hover:text-blue-400'>{value.mat}</Link></td>
                        <td className="p-3 text-sm text-gray-700 font-semibold"><Link href={`/student/${value.mat}`} className='hover:underline hover:text-blue-400'>{value.nom}</Link></td>
                        <td className="p-3 text-sm text-gray-700 font-semibold">{value.moy}</td>
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
