import { Link } from 'react-router-dom'
import './BarraNav.css'
import { ConfigPerfil } from '../ConfigPerfil'
const BarraNav = () => {
  const isAuthenticated = !!localStorage.getItem('user_token') // Verifica se o token existe

  return (
    <header className="cabecario">
      <nav className="BarraNav">
        <div className="container-btns">
          <div className="bg-btn">
            <Link to="/home" id="btn-nav">
              Home
            </Link>
          </div>

          {/* Se o usuário estiver autenticado, mostre o perfil. Se não, mostre "Entrar" */}
          {isAuthenticated ? (
            <div className="bg-btn">
              <ConfigPerfil />
            </div>
          ) : (
            <div className="bg-btn">
              <Link to="/login" id="btn-nav">
                Entrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default BarraNav
