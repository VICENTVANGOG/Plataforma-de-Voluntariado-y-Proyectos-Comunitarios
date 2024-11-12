import React from 'react'
import AuthGuard from './guard/AuthGuard'
import NavBar from '@/UI/organims/navBarUser/navbarUser'

export default function PrivateLayout(
    { children }: { children: React.ReactNode }
) {
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <NavBar/>
            <AuthGuard>
                {children}
            </AuthGuard>
        </div>
    )
}