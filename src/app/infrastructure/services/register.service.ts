import { ILoginRequest, IRegisterRequest, LoginResponse, RegisterResponse } from "@/app/core/application/dto";
import { PAuth } from "@/app/core/application/ports/auth.port";
import { HttpClient } from "../utils";  

export class AuthService implements PAuth {
    private clientHttp: HttpClient;
    private basePath: string = "api/v1";  

    constructor() {
        this.clientHttp = new HttpClient();
    }
    login(req: ILoginRequest): Promise<LoginResponse> {
        throw new Error("Method not implemented.");
    }
    
    async register(req: IRegisterRequest): Promise<RegisterResponse> {
        try {
            const response = await this.clientHttp.post<RegisterResponse, IRegisterRequest>(
                `${this.basePath}/users`,  
                req
            );
            return response;  
        } catch (error: any) {
            console.error("Error en el registro:", error);  
            throw new Error(`Error al registrar el usuario: ${error.message || error}`);
        }
    }
   
}
