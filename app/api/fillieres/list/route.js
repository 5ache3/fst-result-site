import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const db = await createConnection()
        const query="SELECT DISTINCT filliere as L,fil as l FROM etudiants ORDER BY filliere";
        const [response]= await db.query(query);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}