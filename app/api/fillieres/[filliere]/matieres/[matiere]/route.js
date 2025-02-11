import { createConnection } from "@/lib/connection";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { filliere,matiere } = params;
        const db = await createConnection()
        const query=`SELECT matieres.matricule mat,etudiants.name nom,note_tp nt,note_dev nd
                            ,note_exam ne,note_finale nf,moyenne mo
                    FROM matieres 
                        INNER JOIN etudiants 
                            ON etudiants.matricule=matieres.matricule
                        LEFT JOIN semestres 
                            ON semestres.matricule=matieres.matricule and
                                semestres.fil=matieres.fil and
                                semestres.semestre=matieres.semestre
                        WHERE (matieres.id =? OR matieres.name=?)
                                AND matieres.fil =?`;
        const [response]= await db.query(query,[matiere,matiere,filliere]);
        return NextResponse.json(response)
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}