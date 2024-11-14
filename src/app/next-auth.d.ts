

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      photo?: string | null; 
      token?:string | null; 
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
    photo?: string | null;
    role: string;
  }
}
