import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { Session } from "next-auth";

const defaultBaseUrl = "https://communnityvolunteering-production.up.railway.app/api/v1"

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || defaultBaseUrl;
    }

    private async getHeader(formData: boolean = false) {
        const session = await getServerSession(authOptions) as Session; 
        
    
        if (!session?.user?.token) {
            throw new Error("No se ha encontrado un token de sesión.");
        }
    
        const headers: HeadersInit = {};
    
        headers["Authorization"] = `Bearer ${session.user.token}`;
    
        if (formData === false) {
            headers["Content-Type"] = "application/json";
        }
    
        return headers;
    }
    
    

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return await response.json();
    }

    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "GET",
            cache: "no-store"
        })
        return this.handleResponse(response)
    }

    async delete<T>(url: string): Promise<T> {
        console.log("URL del cliente DELETE:", url);
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers,
            method: "DELETE",
        });
        return this.handleResponse(response);
    }

    async post<T, B>(url: string, body: B, authRequired: boolean = true): Promise<T> {
        const headers = await this.getHeader(authRequired);
    
        if (body instanceof FormData) {
            delete headers["Content-Type"];
        }
    
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "POST",
            body: body instanceof FormData ? body : JSON.stringify(body),
        });
    
        return this.handleResponse(response);
    }
    

    async patch<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "PATCH",
            body: JSON.stringify(body),
        })
        return this.handleResponse(response);
    }
}