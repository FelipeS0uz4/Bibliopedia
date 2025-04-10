'use client'

import type React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  BookOpen,
  Coffee,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'
import { Button } from './../../componentes/components/ui/newButton'
import { Input } from './../../componentes/components/ui/NewInput'
import { Label } from './../../componentes/components/ui/label'
import { Checkbox } from './../../componentes/components/ui/checkbox'
import './PaginadeLogin.css'

interface UserLogin {
  Email: string
  Senha: string
}

export default function Login() {
  const [formData, setFormData] = useState<UserLogin>({
    Email: '',
    Senha: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)

  const router = useNavigate()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field?: 'Email' | 'Senha'
  ) => {
    const { value } = e.target
    if (field === 'Email') {
      setFormData(prev => ({ ...prev, Email: value }))
      setEmail(value)
    } else if (field === 'Senha') {
      setFormData(prev => ({ ...prev, Senha: value }))
      setPassword(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMensagemErro(null)

    try {
      const response = await fetch('http://127.0.0.1:5500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Login realizado com sucesso:', data)
        localStorage.setItem('user_token', data.sessao.user_id)
        router('/home')
      } else {
        const errorData = await response.json()
        setMensagemErro(
          errorData.message ||
            'Erro ao fazer login. Verifique suas credenciais.'
        )
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      setMensagemErro('Erro de conexão com o servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://127.0.0.1:5500/login/google'
  }

  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
        <div className="header-container">
          <div className="header-logo">
            <BookOpen className="logo-icon" />
            <h1 className="header-title">CoffeeReads</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-form-container">
          <div className="login-card">
            {/* Login Header */}
            <div className="login-card-header">
              <div className="login-card-header-icon">
                <Coffee className="coffee-icon" />
              </div>
              <h2 className="login-card-title">Bem-vindo de volta</h2>
              <p className="login-card-subtitle">
                Entre para continuar sua jornada literária
              </p>
            </div>

            {/* Mensagem de erro */}
            {mensagemErro && (
              <div className="login-error">
                <p className="error-text">{mensagemErro}</p>
              </div>
            )}

            {/* Login Form */}
            <div className="login-form">
              <form onSubmit={handleSubmit} className="login-form-space">
                {/* Campo Email */}
                <div className="form-group">
                  <Label htmlFor="email" className="form-label">
                    Email
                  </Label>
                  <div className="input-relative">
                    <Mail className="input-icon" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="input-field"
                      value={email}
                      onChange={e => handleInputChange(e, 'Email')}
                      required
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div className="form-group">
                  <div className="form-password-header">
                    <Label htmlFor="password" className="form-label">
                      Senha
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="forgot-password-link"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="input-relative">
                    <Lock className="input-icon" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="input-field"
                      value={password}
                      onChange={e => handleInputChange(e, 'Senha')}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? 'Esconder senha' : 'Mostrar senha'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="toggle-icon" />
                      ) : (
                        <Eye className="toggle-icon" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox "Lembrar de mim" */}
                <div className="checkbox-container">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={checked =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember-me" className="checkbox-label">
                    Lembrar de mim
                  </Label>
                </div>

                {/* Botão de submit */}
                <Button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner-container">
                      <div className="spinner" />
                      Entrando...
                    </div>
                  ) : (
                    <div className="btn-content">
                      Entrar
                      <ArrowRight className="btn-arrow" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divisor e botão de login com Google */}
              <div className="divider-container">
                <div className="divider-line" />
                <span className="divider-text">ou continue com</span>
                <div className="divider-line" />
              </div>

              <div className="google-container">
                <Button
                  type="button"
                  variant="outline"
                  className="google-btn"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="google-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Continuar com Google
                </Button>
              </div>

              {/* Link para cadastro */}
              <div className="register-container">
                <p className="register-text">
                  Não tem uma conta?{' '}
                  <Link to="/register" className="register-link">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Coffee Quote */}
          <div className="coffee-quote">
            <p>
              "Um bom livro é como um bom café: desperta os sentidos e aquece a
              alma."
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-footer">
        <div className="footer-container">
          <p>&copy; 2025 CoffeeReads. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
