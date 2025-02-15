
import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(
    req: Request, 
    { params }: { params: { [key: string]: string } }
    ){
    try {
        const db = await createConnection()
        const limit=20;
        const url = new URL(req.url);
        const allowedSortColumns = ["moy", "mat", "nom"];
        const allowedOrderValues = ["asc", "desc"];
        let sort = url.searchParams.get("sort") || "moy"; 
        let order = url.searchParams.get("order") || "desc";
        let page = Number(url.searchParams.get("page")) || 1;

        // Validate sorting column and order direction
        if (!allowedSortColumns.includes(sort)) sort = "moy";
        if(sort!='moy'){
            if(!url.searchParams.get("order")||!allowedOrderValues.includes(order)){
                order='asc'
            }
            }
        if (!allowedOrderValues.includes(order)) order = "desc";
        const start=limit*(page-1);
        const query=`SELECT S.matricule mat,E.name nom,moyenne moy,S.fil filliere FROM semestres S
                    INNER JOIN etudiants E ON 
                        E.matricule=S.matricule
                    WHERE semestre IN (?) ORDER BY ${sort} ${order} LIMIT ${start},${limit}`;
        const [response]= await db.query(query,[['S1','S3','S5']]);
        return NextResponse.json(response)
    }catch(error: unknown){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}