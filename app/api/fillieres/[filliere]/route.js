import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere } = params;
        const db = await createConnection()
        const query=`SELECT S.matricule mat,E.name nom,moyenne moy FROM semestres S
                    INNER JOIN etudiants E ON 
                        E.matricule=S.matricule
                    WHERE S.fil=? AND semestre IN (?) ORDER BY moy DESC`;
        const [response]= await db.query(query,[filliere,['S1','S3','S5']]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}