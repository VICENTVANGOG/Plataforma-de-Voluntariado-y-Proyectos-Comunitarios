'use client'

import Button from "@/UI/atoms/button"
import { useState } from "react"
import styles from './hero.module.scss'

export default function Component() {
  const [, setIsHovered] = useState(false)

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Conecta, Colabora, Cambia el Mundo
        </h1>
        
        <p className={styles.description}>
          Únete a nuestra comunidad de voluntarios y organizadores. Encuentra proyectos que te apasionen o crea los tuyos propios para hacer una diferencia en tu comunidad.
        </p>
        
        <div className={styles.actions}>
          <Button 
            size="small"
            className={styles.primaryButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Explorar Proyectos
          </Button>
          
          <Button 
            variant="outline" 
            size="small"
            className={styles.secondaryButton}
          >
            Comenzar como Organizador
          </Button>
        </div>
      </div>
    </section>
  )
}