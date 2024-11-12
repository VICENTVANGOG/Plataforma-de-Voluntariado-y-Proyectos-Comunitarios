
import React from 'react'
import AuthGuard from './guard/AuthGuard'

export default function PrivateLayout(
    { children }: { children: React.ReactNode }
) {
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AuthGuard>
                {children}
            </AuthGuard>
        </div>
    )
}