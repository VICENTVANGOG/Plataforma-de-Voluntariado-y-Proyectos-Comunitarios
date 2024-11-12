export interface RegisterResponse {
    statusCode: number;
    message: string;
    data: {
        access_token: string;
        user: {
            email: string;
            sub: number; // ID del usuario
            role: string; // Rol del usuario (e.g., "organizer")
        };
    };
}
