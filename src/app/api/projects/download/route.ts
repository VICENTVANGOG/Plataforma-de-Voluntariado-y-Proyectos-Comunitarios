import { HttpClient } from '@/app/infractrusture/utils/client-http';
import { NextResponse } from 'next/server';

export async function GET(_: Request) {
    try {
        const httpClient = new HttpClient();

        // Obtener el archivo como un Blob
        const fileBlob = await httpClient.getFile('projects/report/download');
  
        // Configurar las cabeceras para la descarga
        const headers = new Headers();
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Content-Disposition', 'attachment; filename=archivo-descargado.xlsx');

        // Devolver el archivo como respuesta
        return new NextResponse(fileBlob, { status: 200, headers });
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        return new NextResponse('Error al procesar la solicitud de archivo', { status: 500 });
    }
}
