import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere,module } = params;
        const db = await createConnection()
        // const query="SELECT DISTINCT module m FROM matieres WHERE fil=? AND (semestre='S1' OR semestre='S3' OR semestre='S5') AND module not like 'M%' order by m";
        const query=`SELECT module,avg(moyenne) moy,count(decision) cont from modules 
                    WHERE module =? and modules.fil =? and semestre IN ('S1' OR 'S2' OR 'S3')`;
        const [response]= await db.query(query,[module,filliere]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({error:error})
    }
}