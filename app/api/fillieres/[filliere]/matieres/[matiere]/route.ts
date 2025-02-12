import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(
        req: Request, 
        { params }: { params: { [key: string]: string } }
    ) {
    try {
        const limit=20;
        const { filliere,matiere } =await params;
        const db = await createConnection();
        const url= new URL(req.url);
        const allowedSortColumns = ["mo", "mat", "nom",'nt','nd','ne','nf'];
        const allowedOrderValues = ["asc", "desc"];
        let sort = url.searchParams.get("sort") || "mo"; 
        let order = url.searchParams.get("order") || "desc";
        let page = Number(url.searchParams.get("page")) || 1;
        const start=limit*(page-1);
        
        if (!allowedSortColumns.includes(sort)) sort = "mo";
        if(!['mo','nt','ne','nd','nf'].includes(sort)){
            if(!url.searchParams.get("order")||!allowedOrderValues.includes(order)){
                order='asc'
            }
            }
        if (!allowedOrderValues.includes(order)) order = "desc";

        const query=`SELECT matieres.matricule mat,etudiants.name nom,note_tp nt,note_dev nd
                            ,note_exam ne,note_finale nf,moyenne mo
                    FROM matieres 
                        INNER JOIN etudiants 
                            ON etudiants.matricule=matieres.matricule
                        LEFT JOIN semestres 
                            ON semestres.matricule=matieres.matricule and
                                semestres.fil=matieres.fil and
                                semestres.semestre=matieres.semestre
                        WHERE (matieres.id =? OR matieres.name=?)
                                AND matieres.fil =?
                                ORDER BY ${sort} ${order} LIMIT ${start},${limit}
                                `;
        const [response]= await db.query(query,[matiere,matiere,filliere]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}