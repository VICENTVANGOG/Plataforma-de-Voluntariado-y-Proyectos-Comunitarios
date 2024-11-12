
export interface LoginResponse {
    data: any;
    access_token: string;
    user: {
        email: string;
        sub: number; 
        role: string;
        photo:string;  
    };
}
