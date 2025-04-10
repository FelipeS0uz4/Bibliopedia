import "./Input.css"

type InputProps = {
  type: string
  placeholder?: string
  className?: string
}

export function Input({ type, placeholder, className = "" }: InputProps) {
  return <input type={type} placeholder={placeholder} className={`input ${className}`} />
}
