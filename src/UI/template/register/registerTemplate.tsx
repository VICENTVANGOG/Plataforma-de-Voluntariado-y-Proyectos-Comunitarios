import React from 'react';
import { RegisterForm } from "@/UI/organims"; 


const RegisterTemplate = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterTemplate;
