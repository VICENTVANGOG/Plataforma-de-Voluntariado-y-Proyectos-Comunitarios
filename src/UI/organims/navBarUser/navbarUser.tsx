"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Download, LogOut, Plus, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuItem } from "@/UI/atoms/index"
import Button from '@/UI/atoms/button'
import styles from "./NavBar.module.scss"

export default function NavBar() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Cargando...</div> 
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          VolunteerConnect
        </Link>
        <span className={styles.dashboardTitle}>Dashboard de Proyectos</span>
      </div>
      <div className={styles.actionsContainer}>
        <Button variant="outline" size="small">
          <Download className="h-4 w-4" />
          Descargar Reporte
        </Button>
        <Button variant="primary" size="small">
          <Plus className="h-4 w-4" />
          Nuevo Proyecto
        </Button>
        {session?.user ? (
       <DropdownMenu
       trigger={
         <div className={styles.userInfo}>
           <div className={styles.profileImageWrapper}>
             <img
               src={session.user.photo || "https://via.placeholder.com/150"}
               alt="Foto de perfil"
               width={40}
               height={40}
               className={styles.profileImage}
             />
           </div>
           <span className={styles.userName}>{session.user.name}</span>
           <ChevronDown className="h-4 w-4 text-muted" />
         </div>
       }
     >
       <DropdownMenuItem className={styles.menuItem}>Perfil</DropdownMenuItem>
       <DropdownMenuItem className={styles.menuItem}>Configuración</DropdownMenuItem>
       <DropdownMenuItem onClick={() => signOut()} className={`${styles.menuItem} ${styles.signOut}`}>
         <LogOut className="mr-2 h-4 w-4" />
         Cerrar sesión
       </DropdownMenuItem>
     </DropdownMenu>
     
        ) : (
          <Button variant="outline" size="small">
            Iniciar sesión
          </Button>
        )}
      </div>
    </nav>
  )
}
