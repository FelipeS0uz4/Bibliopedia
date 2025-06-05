'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import {
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import { Button } from './../../componentes/components/ui/newButton'
import { Input } from './../../componentes/components/ui/NewInput'
import { Label } from './../../componentes/components/ui/label'
import { Progress } from './../../componentes/components/ui/progress'
import './Senha.css'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState('')
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 25
    if (/\d/.test(password)) strength += 25
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25
    if (/[^a-zA-Z0-9]/.test(password)) strength += 25

    setPasswordStrength(strength)
  }, [password])

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return 'Vazio'
    if (passwordStrength <= 25) return 'Fraca'
    if (passwordStrength <= 50) return 'Média'
    if (passwordStrength <= 75) return 'Boa'
    return 'Forte'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }

    if (passwordStrength < 50) {
      alert('Por favor, escolha uma senha mais forte.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `http://127.0.0.1:5500/usuario/recover/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ senha: password }),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao redefinir a senha.')
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Erro ao redefinir senha:', error)
      alert('Erro ao redefinir sua senha.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="headerContent">
          <BookOpen className="logoIcon" />
          <h1 className="logoText">CoffeeReads</h1>
        </div>
      </header>

      <main className="main">
        <div className="cardWrapper">
          {!isSuccess ? (
            <div className="card">
              <div className="cardHeader">
                <Lock className="lockIcon" />
                <h2 className="title">Redefinir Senha</h2>
                <p className="subtitle">Crie uma nova senha para sua conta</p>
              </div>

              <div className="cardBody">
                <form onSubmit={handleSubmit} className="form">
                  <div>
                    <Label htmlFor="password" className="label">
                      Nova Senha
                    </Label>
                    <div className="inputGroup">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggleBtn"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <div className="strength">
                      <span>Força: {getStrengthLabel()}</span>
                      <span>{passwordStrength}%</span>
                    </div>
                    <Progress value={passwordStrength} />
                    <ul className="requirements">
                      <li
                        className={password.length >= 8 ? 'valid' : 'invalid'}
                      >
                        Mínimo de 8 caracteres
                      </li>
                      <li className={/\d/.test(password) ? 'valid' : 'invalid'}>
                        Pelo menos um número
                      </li>
                      <li
                        className={
                          /[a-z]/.test(password) && /[A-Z]/.test(password)
                            ? 'valid'
                            : 'invalid'
                        }
                      >
                        Letras maiúsculas e minúsculas
                      </li>
                      <li
                        className={
                          /[^a-zA-Z0-9]/.test(password) ? 'valid' : 'invalid'
                        }
                      >
                        Pelo menos um caractere especial
                      </li>
                    </ul>
                  </div>

                  <div>
                    <Label htmlFor="confirm-password" className="label">
                      Confirmar Nova Senha
                    </Label>
                    <div className="inputGroup">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="toggleBtn"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="invalid">As senhas não coincidem</p>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <p className="valid">Senhas coincidem</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="submitBtn"
                    disabled={
                      isLoading ||
                      password !== confirmPassword ||
                      passwordStrength < 50
                    }
                  >
                    {isLoading ? 'Processando...' : 'Redefinir Senha'}
                  </Button>
                </form>

                <div className="backToLogin">
                  <Link href="/login">
                    <ArrowLeft /> Voltar para o login
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="successCard">
              <CheckCircle className="successIcon" />
              <h2 className="title">Senha Redefinida com Sucesso!</h2>
              <p className="subtitle">
                Agora você pode fazer login com sua nova senha.
              </p>
              <Button asChild>
                <Link to="/Login">Ir para o Login</Link>
              </Button>
            </div>
          )}

          <p className="quote">
            "Um bom livro, como um bom café, deve ser saboreado lentamente, uma
            página de cada vez."
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 CoffeeReads. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
