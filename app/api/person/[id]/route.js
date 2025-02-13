import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try{
        const {id} = await params;
        const db = await createConnection()
        const query=`SELECT name mat_n,module mod_n, note_tp nt,note_dev nd,
                note_exam ne,note_finale nf,decision d,id r FROM matieres WHERE matricule=? AND semestre IN(?)`;
        const [response]= await db.query(query,[id,['S1','S3','S5']]);

        const query2=`SELECT module n,moyenne m,decision d FROM modules
                    WHERE matricule=? AND semestre IN(?)`;
        const [response2]= await db.query(query2,[id,['S1','S3','S5']]);
        
        return NextResponse.json([response,response2])
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}