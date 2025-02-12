import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere } = await params;
        const db = await createConnection()
        const query=`SELECT filliere,count(moyenne) nb,avg(moyenne) avarage FROM semestres WHERE fil=?
                         AND semestre IN(?) GROUP BY filliere`;
        const [response]= await db.query(query,[filliere,['S1','S3','S5']]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}