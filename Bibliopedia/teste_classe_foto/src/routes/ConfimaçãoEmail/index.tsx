'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import './Email.css'

export default function VerifyEmail() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      alert('Por favor, insira um e-mail válido.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`http://127.0.0.1:5500/usuario/${email}`, {
        method: 'PUT',
      })

      if (!response.ok) {
        throw new Error('Erro ao verificar e-mail.')
      }

      alert('E-mail enviado com sucesso!')
    } catch (err) {
      alert('Erro ao enviar e-mail para verificação.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="email-container">
      <div className="email-card">
        {!isVerified ? (
          <>
            <Mail className="email-icon" />
            <h1 className="email-title">Verificar E-mail</h1>
            <p className="email-subtitle">
              Digite seu e-mail para verificar sua conta
            </p>
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button
                type="submit"
                className="email-button"
                disabled={isLoading}
              >
                {isLoading ? 'Verificando...' : 'Verificar E-mail'}
              </button>
            </form>
          </>
        ) : (
          <div className="email-success">
            <CheckCircle className="email-success-icon" />
            <h2 className="email-success-message">
              E-mail verificado com sucesso!
            </h2>
            <p className="email-subtitle">Você pode prosseguir com o login.</p>
          </div>
        )}
      </div>
    </div>
  )
}
