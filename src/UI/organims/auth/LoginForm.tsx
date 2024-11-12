"use client";

import { ErrorResponse, FieldError, ILoginRequest } from "@/app/core/application/dto";
import { FormField } from "@/UI/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Validación con Yup
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
});

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter();

    const handleLogin = async (data: ILoginRequest) => {
        console.log("Datos recibidos para login:", data); 

        try {

            const result = await signIn("credentials", {
                redirect: false, 
                email: data.email,
                password: data.password,
            });

            console.log("Resultado de signIn:", result); 

            if (result?.error) {
                console.error("Ocurrio un error al iniciar sesión:", result.error);
                handleError(result.error);
                return;
            }

            console.log("Inicio de sesión exitoso. Redirigiendo...");
            router.push("/dashboard/home");
            router.refresh();
        } catch (error) {
            console.error("Error durante el proceso de login:", error); 
        }
    };

    const handleError = (error: unknown) => {
        console.log("Manejando error:", error); 

        const erroData = error as ErrorResponse;

        if (erroData && erroData.errors) {
            console.log("Errores encontrados:", erroData.errors); 

            if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
                erroData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    console.log(`Error en el campo: ${field}, mensaje: ${error}`);
                    setError(field as keyof ILoginRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in erroData.errors[0]) {
                    console.log("Error general:", erroData.errors[0].message);
                    setError("email", {
                        message: erroData.errors[0].message,
                    });
                }
            }
        } else {
            console.log("No se encontraron errores de tipo ErrorResponse.");
        }
    };

    return (
        <form
            className="w-full max-w-sm mx-auto p-4 space-y-4"
            onSubmit={handleSubmit(handleLogin)}
        >
            <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>

            <FormField<ILoginRequest>
                control={control}
                type="email"
                label="Correo Electrónico"
                name="email"
                error={errors.email}
                placeholder="Ingresa tu correo"
            />

            <FormField<ILoginRequest>
                control={control}
                type="password"
                label="Contraseña"
                name="password"
                error={errors.password}
                placeholder="Ingresa tu contraseña"
            />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
                Iniciar Sesión
            </button>
        </form>
    );
};
