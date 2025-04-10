import './LayoutAvaliacao.css'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InformacoesGerais } from '../../componentes/BarraDePesquisa/ProcuraDeDados'
import SecaoComentarios from '../../componentes/SecaoComentarios'
import LoadingScreen from '../../componentes/LoadingScreen'

interface Informacoes {
  Nome: string
  imagem: string
  Descricao: string
}

interface DadosCompra {
  valor: number
  moeda: string
  link: string
}

const LayoutAvaliacao: React.FC = () => {
  const { livroId } = useParams<{ livroId: string }>()
  const [informacoes, setInformacoes] = useState<Informacoes | null>(null)
  const [dadosCompra, setDadosCompra] = useState<DadosCompra | null>(null)
  const isAuthenticated = !!localStorage.getItem('user_token')

  useEffect(() => {
    const fetchInformacoes = async () => {
      if (livroId) {
        try {
          const dados = await InformacoesGerais(livroId)
          setInformacoes(dados)
        } catch (error) {
          console.error('Erro ao buscar informações:', error)
        }
      }
    }

    const fetchDadosCompra = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5500/livro/comprar/${livroId}`
        )
        if (response.ok) {
          const data = await response.json()
          setDadosCompra(data)
          console.log(data)
        } else {
          console.error(
            'Erro ao buscar informações de compra:',
            response.status
          )
        }
      } catch (error) {
        console.error('Erro ao buscar informações de compra:', error)
      }
    }

    fetchInformacoes()
    fetchDadosCompra()
  }, [livroId])

  const handleOnclick = async () => {
    if (!informacoes) return

    const livroData = {
      Nome: informacoes.Nome,
      imagem: informacoes.imagem,
      Descricao: informacoes.Descricao,
      IdUsuario: localStorage.getItem('user_token'),
    }

    try {
      const response = await fetch('http://127.0.0.1:5500/livro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroData),
      })

      if (response.ok) {
        console.log('Livro adicionado à biblioteca com sucesso!')
      } else {
        console.error(
          'Erro ao adicionar o livro à biblioteca:',
          response.status
        )
      }
    } catch (error) {
      console.error('Erro ao adicionar o livro à biblioteca:', error)
    }
  }

  return (
    <div className="Pagina">
      {informacoes ? (
        <>
          <section className="section-container">
            <div className="container-livro">
              <cite className="titulo">{informacoes.Nome}</cite>
              <img src={informacoes.imagem} alt={informacoes.Nome} />
              <button type="button" onClick={handleOnclick}>
                Colocar o livro na biblioteca
              </button>
            </div>
            <div className="container-sinopse">
              <p className="sinopse">{informacoes.Descricao}</p>
            </div>
          </section>

          {/* Seção para exibir as informações de compra */}
          {dadosCompra ? (
            <section className="container-compra">
              <h2>Informações de Compra</h2>
              <p>
                <strong>Preço:</strong> {dadosCompra.valor} {dadosCompra.moeda}
              </p>
              <a
                href={dadosCompra.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn-comprar">
                  Comprar Livro
                </button>
              </a>
            </section>
          ) : (
            <p className="sem-compra">
              Este livro não está disponível para compra.
            </p>
          )}

          {isAuthenticated ? <SecaoComentarios LivroId={livroId!} /> : null}
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  )
}

export default LayoutAvaliacao
