"use client";

import { ErrorResponse, FieldError, ILoginRequest } from "@/app/core/application/dto";
import { FormField } from "@/UI/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import styles from "../sass/LoginForm.module.scss";

// Definimos el esquema de validación con Yup
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
  // Definimos el formulario con react-hook-form
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

  // Maneja el inicio de sesión
  const handleLogin = async (data: ILoginRequest) => {
    console.log("Datos recibidos para login:", data);

    try {
      // Intentamos hacer login con las credenciales proporcionadas
      const result = await signIn("credentials", {
        redirect: false, // No redirige automáticamente
        email: data.email,
        password: data.password,
      });

      console.log("Resultado de signIn:", result);

      if (result?.error) {
        console.error("Ocurrio un error al iniciar sesión:", result.error);
        handleError(result.error);
        return;
      }

      // Si el login es exitoso, redirige al dashboard
      console.log("Inicio de sesión exitoso. Redirigiendo...");
      router.push("/dashboard/proyect");
      router.refresh();
    } catch (error) {
      console.error("Error durante el proceso de login:", error);
    }
  };

  // Manejamos los errores de autenticación
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
    <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
      <h2>Iniciar Sesión</h2>

      {/* Campo de correo electrónico */}
      <FormField<ILoginRequest>
        control={control}
        type="email"
        label="Correo Electrónico"
        name="email"
        error={errors.email}
        placeholder="Ingresa tu correo"
        className={styles.formField}
      />

      {/* Campo de contraseña */}
      <FormField<ILoginRequest>
        control={control}
        type="password"
        label="Contraseña"
        name="password"
        error={errors.password}
        placeholder="Ingresa tu contraseña"
        className={styles.formField}
      />


      <button type="submit" className={styles.button}>
        Iniciar Sesión
      </button>


      <div className={styles.linkContainer}>
        <p>
          ¿No tienes una cuenta?{" "}
          <Link href="/registro" className={styles.link}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </form>
  );
};
