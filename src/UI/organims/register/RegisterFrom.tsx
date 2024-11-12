"use client";

import { IRegisterRequest } from "@/app/core/application/dto";
import { AuthService } from "@/app/infrastructure/services/register.service";
import { FormField } from "@/UI/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";


export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IRegisterRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const router = useRouter();

    const handleRegister = async (data: IRegisterRequest) => {
        console.log("Datos recibidos para registro:", data);

        try {

            const authService = new AuthService();
            const result = await authService.register(data);

            console.log("Resultado de registro:", result);

            if (result?.statusCode !== 201) {
                console.error("Ocurrio un error al registrar el usuario:", result.message);
                handleError(result.message);
                return;
            }

            console.log("Registro exitoso. Redirigiendo...");
            router.push("/dashboard/home");
            router.refresh();
        } catch (error) {
            console.error("Error durante el proceso de registro:", error);
            handleError("Hubo un error durante el registro, por favor intente nuevamente.");
        }
    };

    const handleError = (error: string) => {
        console.log("Manejando error:", error);
        setError("email", {
            message: error,
        });
    };

    return (
        <form
            className="w-full max-w-sm mx-auto p-4 space-y-4"
            onSubmit={handleSubmit(handleRegister)}
        >
            {/* Imagen en la parte superior del formulario */}
            <div className="flex justify-center mb-6">
                <img 
                    src="/path/to/your-image.png" 
                    alt="Logo o imagen decorativa"
                    className="w-32 h-32 object-cover"
                />
            </div>

            <h2 className="text-2xl font-semibold text-center">Registrarse</h2>

            <FormField<IRegisterRequest>
                control={control}
                type="email"
                label="Correo Electrónico"
                name="email"
                error={errors.email}
                placeholder="Ingresa tu correo"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="password"
                label="Contraseña"
                name="password"
                error={errors.password}
                placeholder="Ingresa tu contraseña"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="password"
                label="Confirmar Contraseña"
                name="confirmPassword"
                error={errors.confirmPassword}
                placeholder="Confirma tu contraseña"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="text"
                label="Rol"
                name="role"
                error={errors.role}
                placeholder="Ingresa el rol (e.g., organizer, user)"
            />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
                Registrarse
            </button>
        </form>
    );
};
