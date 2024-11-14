export  default interface IRegisterResponse {
    statusCode: number;
    message:    string;
    data:       DataRegister;
}

export interface DataRegister {
    email: string;
    name:  string;
    role:  string;
    photo: File | null;
    id:    number;
}