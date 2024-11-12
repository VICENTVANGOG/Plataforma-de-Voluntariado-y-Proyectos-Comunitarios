
import NextAuth from "next-auth";
import { AuthUser } from "./path-to-your-auth-service"; 

declare module "next-auth" {
  interface Session {
    user: AuthUser; 
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string; 
  }
}
