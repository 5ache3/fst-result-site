import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const db = await createConnection()
        const query="SELECT count(*) nb FROM etudiants";
        const [response]= await db.query(query);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}