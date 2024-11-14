import { ILoginRequest } from "@/app/core/application/dto/auth";
import { AuthService } from "@/app/infractrusture/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


interface AuthToken {
    id?: string;
    token?: string;
    photo?: string;  
    role?: string;   
}

interface AuthUser {
    id: string;
    name: string;
    email: string;
    token: string;
    photo: string;  
    role: string;   
}


export interface CustomSession extends Session {
    user: {
        id?: string;
        token?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        photo?: string;  
        role?: string;   
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electrónico", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials.email) {
                    console.error("Credenciales faltantes");
                    return null;
                }
                const loginRequest: ILoginRequest = {
                    email: credentials.email,
                    password: credentials.password,
                };

                try {
                    const authService = new AuthService();
                    const response = await authService.login(loginRequest);

                    return {
                        email: loginRequest.email,
                        name: loginRequest.email,
                        token: response.data.access_token,
                        photo: response.data.user.photo,  
                        role: response.data.user.role,    
                    } as AuthUser;
                } catch (error) {
                    console.log(error);
                    return Promise.reject(new Error(JSON.stringify(error)));
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
                token.photo = authUser.photo;  
                token.role = authUser.role;    
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.token = (token as AuthToken).token;
            customSession.user.photo = (token as AuthToken).photo;  
            customSession.user.role = (token as AuthToken).role;    
            return customSession;
        },
    },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
