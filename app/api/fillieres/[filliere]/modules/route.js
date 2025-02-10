import { createConnection } from "../../../../../lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere } = params;
        const db = await createConnection()
        const query="SELECT DISTINCT module m FROM matieres WHERE fil=? AND (semestre='S1' OR semestre='S3' OR semestre='S5') AND module not like 'M%' order by m";
        const [response]= await db.query(query,[filliere]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({error:error})
    }
}