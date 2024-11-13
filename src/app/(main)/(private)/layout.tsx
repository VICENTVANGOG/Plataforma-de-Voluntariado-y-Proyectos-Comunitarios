import React from 'react'
import AuthGuard from './guard/AuthGuard'
import NavBar from '@/UI/organims/navBarUser/navbarUser'
import SidebarLayout from '@/UI/template/sidebar-loyout/sidebar'

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