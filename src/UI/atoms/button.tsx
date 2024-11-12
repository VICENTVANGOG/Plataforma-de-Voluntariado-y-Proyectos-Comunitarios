import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'secondary' | 'text' | 'ghost'
  size?: 'small' | 'medium' | 'large' | 'icon' 
  className?: string
}



const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '',
  ...props 
}) => {
 
  return (
    <button 
      className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className} 
        ${size === 'small' ? 'py-1 px-2' : size === 'medium' ? 'py-2 px-4' : 'py-3 px-6'}
        ${variant === 'primary' ? 'bg-blue-500 text-white' : ''}
        ${variant === 'outline' ? 'border-2 border-blue-500 text-blue-500' : ''}
        ${variant === 'secondary' ? 'bg-gray-300 text-black' : ''}
        ${variant === 'text' ? 'bg-transparent text-blue-500' : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
