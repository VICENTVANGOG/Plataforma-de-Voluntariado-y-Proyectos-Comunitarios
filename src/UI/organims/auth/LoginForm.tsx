'use client'

import { ErrorResponse, FieldError, ILoginRequest } from "@/app/core/application/dto"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import Link from "next/link"
import { Apple, Facebook, Twitter } from 'lucide-react'
import styles from '../sass/LoginForm.module.scss'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("El correo es inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
})

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  })

  const router = useRouter()

  const handleLogin = async (data: ILoginRequest) => {
    try {
      const result = await signIn("credentials", {
        redirect: false, 
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        handleError(result.error)
        return
      }

      router.push("/dashboard/proyect")
      router.refresh()
    } catch (error) {
      console.error("Error durante el proceso de login:", error)
    }
  }

  const handleError = (error: unknown) => {
    const errorData = error as ErrorResponse

    if (errorData && errorData.errors) {
      if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
        errorData.errors.forEach((fieldError) => {
          const { field, error } = fieldError as FieldError
          setError(field as keyof ILoginRequest, {
            message: error,
          })
        })
      } else if ("message" in errorData.errors[0]) {
        setError("email", {
          message: errorData.errors[0].message,
        })
      }
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Login</h1>
          
          <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Petter@gmail.com"
                className={styles.input}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Password"
                className={styles.input}
              />
              {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>
            
            <div className={styles.rememberForgot}>
              <div className={styles.remember}>
                <input type="checkbox" id="remember" className={styles.checkbox} />
                <label htmlFor="remember">Remember Password</label>
              </div>
              <Link href="/forgot-password" className={styles.forgot}>Forgot Password?</Link>
            </div>
            
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            
            <div className={styles.register}>
              <span>No account yet? </span>
              <Link href="/register" className={styles.registerLink}>Register</Link>
            </div>
            
            <div className={styles.divider}>
              <span>Or Login With</span>
            </div>
            
            <div className={styles.socialLogin}>
              <button type="button" className={styles.socialButton} aria-label="Login with Apple">
                <Apple className={styles.socialIcon} />
              </button>
              <button type="button" className={styles.socialButton} aria-label="Login with Twitter">
                <Twitter className={styles.socialIcon} />
              </button>
              <button type="button" className={styles.socialButton} aria-label="Login with Facebook">
                <Facebook className={styles.socialIcon} />
              </button>
            </div>
          </form>
        </div>
        
        <div className={styles.illustrationSection}>
          <img 
            src="/login.png" 
            alt="Person working on a laptop" 
            className={styles.illustration}
          />
        </div>
      </div>
    </main>
  )
}