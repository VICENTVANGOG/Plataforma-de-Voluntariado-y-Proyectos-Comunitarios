import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions, CustomSession } from "../../../../auth/[...nextauth]/route";

const defaultBaseUrl = "https://communnityvolunteering-production.up.railway.app/api/v1";

export async function PATCH(request: Request, { params }: { params: { url: string, id: number } }) {
    try {
        // Obtiene la sesión actual para verificar si está autenticado
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Lee los datos del cuerpo de la solicitud (lo que se va a actualizar)
        const body = await request.json();

        // Usa el parámetro 'url' e 'id' recibido para hacer la solicitud PATCH
        const response = await fetch(`${defaultBaseUrl}/${params.url}/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
            body: JSON.stringify(body) // Enviar los datos para actualizar
        });

        // Maneja las respuestas
        if (response.status === 204) {
            return new NextResponse(null, { status: 204 }); // No Content
        }

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

        // Si hay datos en la respuesta, devuélvelos
        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
