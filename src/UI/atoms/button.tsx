import React from 'react'
import './Button.scss'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  className?: string
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick,
  className = ''
}: ButtonProps) {
  return (
    <button 
      className={`button button--${variant} button--${size} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}