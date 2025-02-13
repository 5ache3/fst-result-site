import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try{
        const {id} = await params;
        const db = await createConnection()
        const query=`SELECT name ,e.matricule mat,e.fil fil,e.filliere,e.amphi a,decision d,moyenne FROM semestres s
                    INNER JOIN etudiants e ON 
                        e.matricule=s.matricule
                    WHERE s.matricule=? AND semestre IN(?)`;
        const [response]= await db.query(query,[id,['S1','S3','S5']]);

        
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}