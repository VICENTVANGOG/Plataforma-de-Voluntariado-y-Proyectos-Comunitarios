import { ILoginRequest, ILoginResponse } from "../dto/auth";

export interface PAuth {
    /**
     * 
     * @param 
     */

    login(req: ILoginRequest): Promise<ILoginResponse>
}