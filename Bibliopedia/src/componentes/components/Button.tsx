import type React from "react"
import "./Button.css"

type ButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Button({ children, className = "", onClick }: ButtonProps) {
  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
<button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
