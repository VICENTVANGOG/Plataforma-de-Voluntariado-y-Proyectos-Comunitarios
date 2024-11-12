
import React from 'react'
import AuthGuard from './guard/AuthGuard'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PrivateLayout(
    { children }: { children: React.ReactNode }
) {
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AuthGuard>
                {children}
                <ToastContainer />
            </AuthGuard>
        </div>
    )
}