import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

const defaultBaseUrl = "https://communnityvolunteering-production.up.railway.app"

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || defaultBaseUrl;
    }

    private async getHeader() {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
   
        if (typeof window === "undefined") { 
            const session = await getServerSession(authOptions) as CustomSession;
            if (session && session.user.token) {
                headers["Authorization"] = `Bearer ${session.user.token}`;
            }
        }
   
        return headers;
    }
    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Error desconocido" }));
            throw errorData;
        }
   
        const contentType = response.headers.get("Content-Type");
   
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return response.text();  
        }
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
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "DELETE",
        })
        return this.handleResponse(response)
    }

    async post<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body),
        })
        return this.handleResponse(response);
    }

    async put<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(body),
        })
        return this.handleResponse(response);
    }
}