import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere,module } = await params;
        const db = await createConnection()
        // const query="SELECT DISTINCT module m FROM matieres WHERE fil=? AND (semestre='S1' OR semestre='S3' OR semestre='S5') AND module not like 'M%' order by m";
        const query=`SELECT name n,ma.id id,m.module m,avg(m.moyenne) moy,count( DISTINCT m.matricule) nb from modules m
                    INNER JOIN matieres ma ON 
                            ma.module=m.module 
                    WHERE m.module =? and m.fil =? and m.semestre IN (?) GROUP BY name,id`;
        const [response]= await db.query(query,[module,filliere,JSON.parse(process.env.NEXT_PUBLIC_SEMESTRES || '[]')]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}