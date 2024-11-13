import { ILoginRequest, LoginResponse } from "@/app/core/application/dto";
import { PAuth } from "@/app/core/application/ports/auth.port";
import { HttpClient } from "../utils";  

export class AuthService implements PAuth {
    private clientHttp: HttpClient;
    private basePath: string = "api/v1/auth";  

    constructor() {
        this.clientHttp = new HttpClient();
    }
    


    async login(req: ILoginRequest): Promise<LoginResponse> {
        try {

            const response = await this.clientHttp.post<LoginResponse, ILoginRequest>(
                `${this.basePath}/login`,  
                req
            );
            return response;  
        } catch (error) {
            console.error("Error en el login:", error);  
            throw new Error("Error al autenticar el usuario");  
        }
    }
}
