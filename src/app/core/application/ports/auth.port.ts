import { ILoginRequest, ILoginResponse } from "../dto";

export interface PAuth {
    /**
     * 
     * @param 
     */

    login(req: ILoginRequest): Promise<ILoginResponse>
}