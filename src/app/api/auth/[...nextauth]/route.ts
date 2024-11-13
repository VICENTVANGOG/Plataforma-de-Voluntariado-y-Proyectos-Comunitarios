import { ILoginRequest } from "@/app/core/application/dto";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
  role: string;   // Agrega el rol
  photo: string;  // Agrega la foto de perfil
}

export interface CustomSession extends Session {
  user: AuthUser;
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
        // Verificación de credenciales faltantes
        if (!credentials?.password || !credentials.email) {
          console.error("Credenciales faltantes");
          return null;  // Si faltan credenciales, no permitir login
        }

        const loginRequest: ILoginRequest = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const authService = new AuthService();
          const response = await authService.login(loginRequest);

          console.log("Respuesta del backend:", response);  // Verifica la respuesta

          // Verificación de si la respuesta tiene un access_token
          if (!response || !response.data?.access_token) {
            console.error("Token no recibido.");
            return null;  // Si no hay token, retornamos null
          }

          // Asegúrate de agregar todos los campos necesarios de la respuesta
          const user = response.data.user;

          return {
            email: user.email,
            id: user.sub.toString(),
            name: user.email,  // O usa el campo adecuado para el nombre
            token: response.data.access_token,  // Asegúrate de pasar el token aquí
            role: user.role || "usuario",  // Si existe el campo `role`, usalo, si no, por defecto "usuario"
            photo: user.photo || "https://via.placeholder.com/150",  // Asegúrate de pasar la foto si existe
          } as AuthUser;

        } catch (error) {
          console.error("Error en el proceso de autenticación:", error);
          return null;  // Si ocurre un error en la autenticación, retornamos null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",  // Estamos usando JWT para manejar la sesión
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Aquí añadimos los nuevos campos al JWT
        token.id = user.id;
        token.token = user.token;
        token.role = user.role;  // Añadimos el rol al JWT
        token.photo = user.photo;  // Añadimos la foto al JWT
      }
      return token;  // Retornamos el token con la información actualizada
    },
    async session({ session, token }) {
      // Agregamos la información del token a la sesión
      const customSession = session as CustomSession;
      customSession.user.id = token.id as string;
      customSession.user.token = token.token as string;
      customSession.user.role = token.role as string;  // Asignamos el rol
      customSession.user.photo = token.photo as string;  // Asignamos la foto
      return customSession;  // Retornamos la sesión actualizada
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
