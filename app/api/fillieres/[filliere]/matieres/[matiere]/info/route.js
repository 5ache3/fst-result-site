import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere,matiere } = await params;
        const db = await createConnection()

        const query=`SELECT name n,id,avg(note_finale) moy_f,
                    avg(note_exam) moy_e,avg(note_dev) moy_d,avg(note_tp) moy_t,
                    count(decision) nb from matieres
                    WHERE (name =? OR id=?) and matieres.fil =? and semestre IN (?) GROUP BY n,id`;
                    
        const [response]= await db.query(query,[matiere,matiere,filliere,JSON.parse(process.env.NEXT_PUBLIC_SEMESTRES || '[]')]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}