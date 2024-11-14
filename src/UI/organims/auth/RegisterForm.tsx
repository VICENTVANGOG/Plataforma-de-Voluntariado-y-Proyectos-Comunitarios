"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField } from "@/UI/molecules";
import { Button } from "@mui/joy";
import { CloudUploadIcon } from "lucide-react";
import { IPostCLient } from "@/app/core/application/dto";
import styles from './RegisterForm.module.scss';

// Validaciones del formulario con Yup
const RegisterSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
    name: yup.string().required("El nombre es obligatorio"),
    role: yup.string().required("El rol es obligatorio"),
    photo: yup.mixed<File>()
});

export const RegisterForm = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IPostCLient>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(RegisterSchema),
    });

    const router = useRouter();

    const handleRegister = async (data: IPostCLient) => {
        console.log("Formulario enviado con los siguientes datos:", data);

        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("name", data.name);
            formData.append("role", data.role);

            if (data.photo) {
                formData.append("photo", data.photo);
            } else {
                console.error("No se ha seleccionado una foto.");
            }

            const response = await fetch("/api/register", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en la respuesta de la API:", errorData);
                throw new Error("Error al registrar el usuario");
            }

            alert('Usuario registrado exitosamente');
            router.push("/login");

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(Array.from(event.target.files));
            console.log("Archivos seleccionados:", Array.from(event.target.files)); 
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.formSection}>
                    <h2 className={styles.title}>Registro</h2>

                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(handleRegister)}
                    >
                        {/* Campo de Correo Electrónico */}
                        <FormField<IPostCLient>
                            control={control}
                            type="email"
                            label="Correo Electrónico"
                            name="email"
                            error={errors.email}
                            placeholder="Ingresa tu correo"
                            classname={styles.inputGroup}
                        />

                        {/* Campo de Contraseña */}
                        <FormField<IPostCLient>
                            control={control}
                            type="password"
                            label="Contraseña"
                            name="password"
                            error={errors.password}
                            placeholder="Ingresa tu contraseña"
                            classname={styles.inputGroup}
                        />

                        <FormField<IPostCLient>
                            control={control}
                            type="text"
                            label="Nombre"
                            name="name"
                            error={errors.name}
                            placeholder="Ingresa tu nombre"
                            classname={styles.inputGroup}
                        />

                        <div className={styles.inputGroup}>
                            <label htmlFor="role" className={styles.label}>Rol</label>
                            <select
                                {...control.register("role")}
                                className={styles.input}
                            >
                                <option value="volunteer">Volunteer</option>
                                <option value="organizer">Organizer</option>
                            </select>
                            {errors.role && <p className={styles.error}>{errors.role.message}</p>}
                        </div>

           
                        <div className={styles.inputGroup}>
                            <Button
                                component="label"
                                variant="soft"
                                startDecorator={<CloudUploadIcon />}
                                fullWidth
                            >
                                Subir Foto
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    multiple
                                />
                            </Button>
                            <ul className="text-sm text-gray-600">
                                {selectedFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>

                   
                        <button
                            type="submit"
                            className={styles.loginButton}
                        >
                            Registrarse
                        </button>
                    </form>

                    <div className={styles.helpLinks}>
                        <p className={styles.helpText}>
                            <a href="/login" className={styles.link}>¿Ya tienes cuenta? Inicia sesión</a>
                        </p>
                        <p className={styles.helpText}>
                            <a href="/forgot-password" className={styles.link}>¿Olvidaste tu contraseña?</a>
                        </p>
                    </div>
                </div>

                <div className={styles.illustrationSection}>
                    <img
                        src="/login.png"
                        alt="Ilustración de registro"
                        className={styles.illustration}
                    />
                </div>
            </div>
        </div>
    );
};
