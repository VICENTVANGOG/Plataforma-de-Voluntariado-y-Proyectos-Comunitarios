import  IResponseRegister  from "@/app/core/application/dto/register/register.response.dto";
import { HttpClient } from "../utils/client-http2";

export class RegisterService {
    private clientHttp: HttpClient;

    constructor() {
        this.clientHttp = new HttpClient();
    }

    async register(req: FormData): Promise<IResponseRegister>{
        const formData = true;
        return await this.clientHttp.post<IResponseRegister, FormData>(
            "users",
            req,
            formData
        )
    }
}