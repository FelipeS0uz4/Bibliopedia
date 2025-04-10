import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      localStorage.setItem('user_token', token) 
    }
    navigate('/home')
  }, [navigate])

  return <p>Carregando...</p>
}
