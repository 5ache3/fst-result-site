import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere } = await params;
        const db = await createConnection()
        const query="SELECT DISTINCT module m FROM matieres WHERE fil=? AND semestre IN(?) AND module not like 'M%' order by m";
        const [response]= await db.query(query,[filliere,JSON.parse(process.env.NEXT_PUBLIC_SEMESTRES || '[]')]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}