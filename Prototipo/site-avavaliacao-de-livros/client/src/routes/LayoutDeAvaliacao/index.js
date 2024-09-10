import './LayoutAvaliacao.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InformacoesGerais } from '../../componentes/BarraDePesquisa/ProcuraDeDados';  // Atualize o caminho se necessário
import SecaoComentarios from '../../componentes/SecaoComentarios';

const LayoutAvaliacao = () => {
  const { livroId } = useParams();  // Obtém o parâmetro da URL
  const [informacoes, setInformacoes] = useState(null);

  useEffect(() => {
    const fetchInformacoes = async () => {
      if (livroId) {
        try {
          const dados = await InformacoesGerais(livroId);
          setInformacoes(dados);
        } catch (error) {
          console.error("Erro ao buscar informações:", error);
        }
      }
    };

    fetchInformacoes();
  }, [livroId]);

  return (
    <div className='Pagina'>
      {informacoes ? (
        <>
        <section className='section-container'>
          <div className='container-livro'>
            <cite className='titulo'>{informacoes.Nome}</cite>
            <img src={informacoes.imagem} alt={informacoes.Nome} />
          </div>
          <div className='container-sinopse'>
          <p className='sinopse'>{informacoes.Descricao}</p>
          </div>
        </section>

        <SecaoComentarios livroId={livroId}/>
          </>
      ) : (
        <p className='carregamento'>Carregando...</p>
      )}
    </div>
  );
  
};


export default LayoutAvaliacao;
