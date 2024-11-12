import { ILoginRequest, LoginResponse } from "../dto";

export interface PAuth {
    /**
     * 
     * @param 
     */

    login(req: ILoginRequest): Promise<LoginResponse>
}