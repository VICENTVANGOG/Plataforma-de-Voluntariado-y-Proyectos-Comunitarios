export interface IRegisterRequest {
    email: string;
    password: string;
    name: string;
    role: string;
    photo?: string | null;
  }