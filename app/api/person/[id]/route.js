import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try{
        const {id} = params;
        const db = await createConnection()
        const query=`SELECT name mat_n,module mod_n, note_tp nt,note_dev nd,
                note_exam ne,note_finale nf,id r FROM matieres WHERE matricule=? AND semestre IN(?)`;
        const [response]= await db.query(query,[id,['S1','S3','S5']]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}