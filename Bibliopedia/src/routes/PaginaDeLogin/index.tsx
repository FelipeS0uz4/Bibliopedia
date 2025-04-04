import { Link, useNavigate } from 'react-router-dom'
import './PaginadeLogin.css'
import { useState } from 'react'

interface UserLogin {
  Email: string
  Senha: string
}

const PaginaDeEntrada = () => {
  const [formData, setFormData] = useState<UserLogin>({
    Email: '',
    Senha: '',
  })
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
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
    console.log('Dados enviados:', formData)

    try {
      const response = await fetch('http://127.0.0.1:5500/login', {
        method: 'POST', // Verifique a rota correta do seu backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Login realizado com sucesso:', data)

        localStorage.setItem('user_token', data.sessao.user_id)
        navigate('/home')
      } else {
        const errorData = await response.json()
        setMensagemErro(
          errorData.message ||
            'Erro ao fazer login. Verifique suas credenciais.'
        )
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error)
      setMensagemErro('Erro de conexão com o servidor.')
    }
  }

  return (
    <div>
      <div className="container-login">
        <h3>Login</h3>
        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
        <form
          action=""
          method="get"
          className="container-form"
          onSubmit={handleSubmit}
        >
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
          <Link to="/cadastro">Cadastrar</Link>
          <button type="submit" className="btn-entrar">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaginaDeEntrada
