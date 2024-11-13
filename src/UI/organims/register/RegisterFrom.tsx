'use client'

import { IRegisterRequest } from "@/app/core/application/dto"
import { AuthService } from "@/app/infrastructure/services/register.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import Link from "next/link"
import { Apple, Facebook, Twitter } from 'lucide-react'
import styles from './register.module.scss'

const registerSchema = yup.object().shape({
    email: yup.string().email("El correo es inválido").required("El correo es obligatorio"),
    password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir').required("Confirmar la contraseña es obligatorio"),
    role: yup.string().required("El rol es obligatorio")
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
  })

  const router = useRouter()

  const handleRegister = async (data: IRegisterRequest) => {
    try {
      const authService = new AuthService()
      const result = await authService.register(data)

      if (result?.statusCode !== 201) {
        handleError(result.message)
        return
      }

      router.push("/dashboard/home")
      router.refresh()
    } catch (error) {
      handleError("Hubo un error durante el registro, por favor intente nuevamente.")
    }
  }

  const handleError = (error: string) => {
    setError("email", {
      message: error,
    })
  }

  return (
    <main className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Registrarse</h1>
          
          <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
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
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar Contraseña</label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                placeholder="Confirma tu contraseña"
                className={styles.input}
              />
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
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
  )
}