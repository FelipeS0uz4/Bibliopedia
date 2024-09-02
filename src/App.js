import './App.css';
import BarradePesquisa from './componentes/BarraDePesquisa';
import SecaodeReal from './componentes/Secao_Primeira';


function App() {
  return (
    <div className='App'>
      <header className="cabecario">
      <nav className="BarraNav">
        <BarradePesquisa />
        <a href="" id="btn-nav">Home</a>
        <a href="" id="btn-nav" className="Ativo">Entrar</a>
      </nav>
    </header>
    <SecaodeReal/>
    </div>

  );
}

export default App;
