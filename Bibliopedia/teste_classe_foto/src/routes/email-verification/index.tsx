import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import './email-activation.css'

export default function EmailActivation() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // Pegando o ID do usuário pela URL
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const activateAccount = async () => {
      try {
        console.log(useParams)
        const response = await fetch(`http://127.0.0.1:5500/activation/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          throw new Error('Falha na ativação da conta.')
        }

        setIsSuccess(true)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    activateAccount()
  }, [id])

  return (
    <div className="email-activation-container">
      <div className="activation-content">
        <h1 className="site-title">Bibliopedia</h1>

        {isLoading ? (
          <p className="activation-message">Ativando sua conta...</p>
        ) : isSuccess ? (
          <>
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2 className="activation-title">Email Ativado com Sucesso!</h2>
            <p className="activation-message">
              Sua conta foi ativada e agora você pode acessar todos os recursos
              do Bibliopedia.
            </p>
            <button type="button" onClick={() => navigate('/login')}>
              Ir para Login
            </button>
          </>
        ) : (
          <>
            <h2 className="activation-title">Erro na ativação</h2>
            <p className="error-message">{error}</p>
            <button type="button" onClick={() => navigate('/home')}>
              Voltar à página principal
            </button>
          </>
        )}
      </div>
    </div>
  )
}
