"use client"
import React, { useState } from 'react'
import styles from './DropdownMenu.module.scss'

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.dropdown}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && <div className={styles.dropdownContent}>{children}</div>}
    </div>
  )
}

export const DropdownMenuItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div className={styles.dropdownItem} {...props}>
    {children}
  </div>
)