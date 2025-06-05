import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const accessToken = urlParams.get('access_token')

    if (token) {
      localStorage.setItem('user_token', token)
    }
    if (accessToken) {
      localStorage.setItem('access_token', accessToken)
    }
    navigate('/home')
  }, [navigate])

  return <p>Carregando...</p>
}
