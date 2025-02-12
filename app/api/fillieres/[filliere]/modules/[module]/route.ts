import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(
        req: Request, 
        { params }: { params: { [key: string]: string } }
    ) {
    try {
        const limit=20;
        const { filliere,module } =await params;
        const db = await createConnection();
        const url= new URL(req.url);
        const allowedSortColumns = ["moy_m", "mat", "nom"];
        const allowedOrderValues = ["asc", "desc"];
        let sort = url.searchParams.get("sort") || "moy_m"; 
        let order = url.searchParams.get("order") || "desc";
        let page = Number(url.searchParams.get("page")) || 1;
        const start=limit*(page-1);
        
        if (!allowedSortColumns.includes(sort)) sort = "moy_m";
        if(sort!='moy_m'){
            if(!url.searchParams.get("order")||!allowedOrderValues.includes(order)){
                order='asc'
            }
            }
        if (!allowedOrderValues.includes(order)) order = "desc";

        const query=`SELECT modules.matricule mat,name nom,moyenne moy_m,decision d from modules 
                    INNER JOIN etudiants 
                        ON etudiants.matricule=modules.matricule
                    WHERE module =? and modules.fil =? and semestre IN (?) ORDER BY ${sort} ${order}
                        LIMIT ${start},${limit}`;
        const [response]= await db.query(query,[module,filliere,['S1','S3','S5']]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}