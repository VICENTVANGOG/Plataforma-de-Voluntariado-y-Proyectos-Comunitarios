export interface IRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    role: "organizer" | "user";
}
