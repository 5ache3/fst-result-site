import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const db = await createConnection()
        const query="SELECT DISTINCT filliere as L,fil as l FROM semestres WHERE semestre IN(?) ORDER BY filliere";
        const [response]= await db.query(query,[JSON.parse(process.env.NEXT_PUBLIC_SEMESTRES || '[]')]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}