import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaginaDeLogin.css'

interface User {
  Nome: string
  Email: string
  Senha: string
}

const PaginaParaCriacao = () => {
  const [formData, setFormData] = useState<User>({
    Nome: '',
    Email: '',
    Senha: '',
  })
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false) // Estado para exibir o pop-up
  const navigate = useNavigate()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:5500/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowPopup(true) // Mostra o pop-up ao concluir o cadastro
      } else {
        const errorData = await response.json()
        setMensagemErro(errorData.message || 'Erro ao Cadastrar.')
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error)
      setMensagemErro('Erro de conexão com o servidor.')
    }
  }

  return (
    <div className="container-login">
      <h3>Cadastro</h3>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      <form className="container-form" onSubmit={handleSubmit}>
        <label htmlFor="Nome">Nome do Usuario: </label>
        <input
          type="text"
          name="Nome"
          id="Nome"
          className="input-login"
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="Email"
          id="email"
          className="input-login"
          onChange={handleInputChange}
        />

        <label htmlFor="senha">Senha: </label>
        <input
          type="password"
          name="Senha"
          id="senha"
          className="input-login"
          onChange={handleInputChange}
        />

        <button type="submit" className="btn-entrar">
          Cadastrar
        </button>
      </form>

      {/* Pop-up de confirmação */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              Um e-mail de ativação foi enviado. Verifique sua caixa de entrada
              para ativar sua conta.
            </p>
            <button type="button" onClick={() => navigate('/login')}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaginaParaCriacao
