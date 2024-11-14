import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions, CustomSession } from "../../../auth/[...nextauth]/route";

const defaultBaseUrl = "https://communnityvolunteering-production.up.railway.app/api/v1";

export async function POST(request: Request, { params }: { params: { url: string } }) {
    try {

        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

       
        const response = await fetch(`${defaultBaseUrl}/${params.url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
            method: 'POST',
            body: JSON.stringify(body)
        });


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
