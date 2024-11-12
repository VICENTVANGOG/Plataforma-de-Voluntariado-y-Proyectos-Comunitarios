
import Navbar from "@/UI/organims/navBar/navBar";
import React from "react";


export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className="layout">
        <Navbar/>
            {children}
        </div>
    );
}