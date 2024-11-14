
declare module "next-auth" {
  interface Session {
    user: AuthUser; 
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
    photo: string;
    role: string;
  }
}
