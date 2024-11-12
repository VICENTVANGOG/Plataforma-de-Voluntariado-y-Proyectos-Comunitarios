import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions, CustomSession } from "../../../auth/[...nextauth]/route";

const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1";

export async function POST(request: Request, { params }: { params: { url: string } }) {
    try {
        // Obtiene la sesión actual para verificar si está autenticado
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Usa el parámetro 'url' recibido para hacer la solicitud
        const response = await fetch(`${defaultBaseUrl}/${params.url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        // Maneja la respuesta de la solicitud
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
