import { createConnection } from "../../../lib/connection";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const db = await createConnection()
        const query="SELECT DISTINCT filliere as L,fil as l FROM etudiants";
        const [response]= await db.query(query);
        return NextResponse.json(response)
    }catch(error){
        NextResponse.json({error:error})
    }
}