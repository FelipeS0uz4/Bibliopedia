import { Link } from 'react-router-dom'
import BarradePesquisa from '../BarraDePesquisa'
import './BarraNav.css'



const BarraNav = () =>{
    return(
        <header className="cabecario">
        <nav className="BarraNav">
          <BarradePesquisa />
          <Link href="" id="btn-nav">Home</Link>
          <Link href="" id="btn-nav">Entrar</Link>
        </nav>
      </header>
    )
}

export default BarraNav