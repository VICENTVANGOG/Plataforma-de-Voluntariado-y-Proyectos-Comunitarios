"use client";
import { IRegisterRequest } from "@/app/core/application/dto";
import { AuthService } from "@/app/infrastructure/services/register.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { Apple, Facebook, Twitter } from "lucide-react";
import styles from "./register.module.scss";
import { useState } from "react";

const registerSchema = yup.object().shape({
  email: yup.string().email("El correo es inválido").required("El correo es obligatorio"),
  password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
  name: yup.string().required("El nombre es obligatorio"),
  role: yup.string().required("El rol es obligatorio"),
  photo: yup.string().required("La foto es obligatoria"),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IRegisterRequest>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const router = useRouter();

  // Manejador de errores
  const handleError = (error: string) => {
    setError("email", { message: error });
  };

  // Función para manejar la selección de imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  // Maneja el envío del formulario
  const onSubmit = async (data: IRegisterRequest) => {
    // Verificamos si hay una foto seleccionada
    if (!photo) {
      setError("photo", { message: "La foto es obligatoria" });
      return;
    }

    try {
      // Log de los datos antes de enviarlos
      console.log('Datos enviados para el registro:', { ...data, photo });

      const authService = new AuthService();
      const result = await authService.register({ ...data, photo: photo.name });

      if (result?.statusCode !== 201) {
        handleError(result.message);
        return;
      }

      // Redirige si el registro es exitoso
      router.push("/dashboard/home");
      router.refresh();
    } catch (error) {
      handleError("Hubo un error durante el registro, por favor intente nuevamente.");
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Registrarse</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                className={styles.input}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Contraseña</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className={styles.input}
              />
              {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Nombre</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
                className={styles.input}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="role" className={styles.label}>Rol</label>
              <input
                {...register("role")}
                type="text"
                id="role"
                placeholder="Ingresa el rol (e.g., organizer, user)"
                className={styles.input}
              />
              {errors.role && <span className={styles.error}>{errors.role.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="photo" className={styles.label}>Selecciona tu foto de perfil</label>
              <input
                {...register("photo")}
                type="file"
                id="photo"
                accept="image/*"
                className={styles.input}
                onChange={handleImageChange}
              />
              {errors.photo && <span className={styles.error}>{errors.photo.message}</span>}
            </div>

            <button type="submit" className={styles.loginButton}>
              Registrarse
            </button>

            <div className={styles.register}>
              <span>¿Ya tienes una cuenta? </span>
              <Link href="/login" className={styles.registerLink}>Inicia sesión</Link>
            </div>

            <div className={styles.divider}>
              <span>O Regístrate Con</span>
            </div>

            <div className={styles.socialLogin}>
              <button type="button" className={styles.socialButton} aria-label="Registrarse con Apple">
                <Apple className={styles.socialIcon} />
              </button>
              <button type="button" className={styles.socialButton} aria-label="Registrarse con Twitter">
                <Twitter className={styles.socialIcon} />
              </button>
              <button type="button" className={styles.socialButton} aria-label="Registrarse con Facebook">
                <Facebook className={styles.socialIcon} />
              </button>
            </div>
          </form>
        </div>

        <div className={styles.illustrationSection}>
          <img 
            src="/login.png" 
            alt="Ilustración de registro" 
            className={styles.illustration}
          />
        </div>
      </div>
    </main>
  );
};
