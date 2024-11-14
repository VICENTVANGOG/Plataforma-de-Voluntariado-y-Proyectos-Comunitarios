'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Download, LogOut, Plus, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuItem } from "@/UI/atoms/index"
import Button from '@/UI/atoms/button'
import { usePathname } from 'next/navigation' 
import styles from "./NavBar.module.scss"

interface NavBarProps {
  onAdd: () => void; 
}

export default function NavBar({ onAdd }: NavBarProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname() 

  if (status === "loading") {
    return <div>Cargando...</div>
  }

  
  const title = pathname === "/dashboard/perfil" ? "Perfil" : "Dashboard de Proyectos"


  const isProfilePage = pathname === "/dashboard/perfil"

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/dashboard/project" className={styles.logo}>
          VolunteerConnect
        </Link>

        <span className={styles.dashboardTitle}>{title}</span>
      </div>
      <div className={styles.actionsContainer}>
        <Button variant="outline" size="small">
          <Download className="h-4 w-4" />
          Descargar Reporte
        </Button>

        {/* Botón "Nuevo Proyecto" con la acción de agregar */}
        <Button
          variant="primary"
          size="small"
          onClick={onAdd}
          className={styles.addProjectButton}
        >
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
            <Link href="/dashboard/perfil" className={styles.logo}>
              <DropdownMenuItem
                className={`${styles.menuItem} ${isProfilePage ? styles.active : ""}`}
              >
                Perfil
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => signOut()} className={`${styles.menuItem} ${styles.signOut}`}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenu>
        ) : (
          <Link href="/auth/login">
            <Button variant="outline" size="small">
              Iniciar sesión
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
