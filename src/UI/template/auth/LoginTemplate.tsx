import { LoginForm } from "@/UI/organims"
import Link from "next/link";
import styles from "../LoginForm.module.scss";

export const LoginTemplate = () => {
    return (
        <div >
            <div >
            <Link href="/home" className={styles.link}>
                volver al Inicio
            </Link>
           
                <LoginForm />
            </div>
        </div>
    )
}