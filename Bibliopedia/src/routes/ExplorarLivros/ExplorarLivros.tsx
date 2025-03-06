import type React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DadosLivrosDetalhados } from '../../componentes/BarraDePesquisa/ProcuraDeDados'
import './ExplorarLivro.css'

interface LivroDetalhado {
  titulo: string
  autores: string
  imagem: string
  dataPublicacao: string
  paginas: number
  genero: string[] // Lista de gêneros do livro
}

const generosDisponiveis = [
  'Action',
  'Adventure',
  'Biography',
  'Classics',
  'Comedy',
  'Crime',
  'Drama',
  'Dystopian',
  'Fantasy',
  'Fiction',
  'Graphic Novel',
  'History',
  'Horror',
  'Humor',
  'Literary Fiction',
  'Magic',
  'Manga',
  'Memoir',
  'Mystery',
  'Mythology',
  'Non-fiction',
  'Paranormal',
  'Philosophy',
  'Poetry',
  'Psychological',
  'Religion',
  'Romance',
  'Satire',
  'Science',
  'Science Fiction',
  'Self-help',
  'Short Stories',
  'Spirituality',
  'Sports',
  'Supernatural',
  'Suspense',
  'Thriller',
  'Travel',
  'Urban Fantasy',
  'War',
  'Western',
  'Young Adult',
]

const ExplorarLivros: React.FC = () => {
  const [livros, setLivros] = useState<LivroDetalhado[]>([]) // Inicializa como array vazio
  const [filtro, setFiltro] = useState<'titulo' | 'autor'>('titulo')
  const [inputValue, setInputValue] = useState<string>('')
  const [generosSelecionados, setGenerosSelecionados] = useState<string[]>([])
  const [autoresSelecionados, setAutoresSelecionados] = useState<string[]>([])

  const location = useLocation()
  const navigate = useNavigate()

  // Extrai o termo de busca da URL
  const searchQuery = new URLSearchParams(location.search).get('query')

  useEffect(() => {
    const buscarLivros = async () => {
      if (!searchQuery) return

      try {
        const resultados = await DadosLivrosDetalhados(searchQuery)

        // Garante que `resultados` seja sempre um array válido
        if (Array.isArray(resultados)) {
          setLivros(resultados)
          console.log(resultados)
        } else {
          setLivros([])
          console.warn('Os dados recebidos não são um array:', resultados)
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error)
        setLivros([]) // Garante que `livros` não fique undefined
      }
    }

    buscarLivros()
  }, [searchQuery])

  // Manipular alteração de checkboxes de gêneros
  const handleGeneroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genero = event.target.value
    setGenerosSelecionados(prev =>
      prev.includes(genero) ? prev.filter(g => g !== genero) : [...prev, genero]
    )
  }

  // Manipular alteração de checkboxes de autores
  const handleAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const autor = event.target.value
    setAutoresSelecionados(prev =>
      prev.includes(autor) ? prev.filter(a => a !== autor) : [...prev, autor]
    )
  }

  // Filtrar livros de acordo com gêneros e autores selecionados
  const livrosFiltrados = livros.filter(livro => {
    const generoMatch =
      generosSelecionados.length === 0 ||
      (Array.isArray(livro.genero) &&
        livro.genero.some(g => generosSelecionados.includes(g)))

    const autorMatch =
      autoresSelecionados.length === 0 ||
      autoresSelecionados.includes(livro.autores)

    return generoMatch && autorMatch
  })

  return (
    <div className="explorar-livros">
      <h1>Explorar Livros</h1>
      <div className="container">
        {/* Filtros */}
        <aside className="filtros">
          <h3>Filtros</h3>

          {/* Gêneros */}
          <div>
            <h4>Gêneros</h4>
            {generosDisponiveis.map(genero => (
              <label key={genero}>
                <input
                  type="checkbox"
                  value={genero}
                  checked={generosSelecionados.includes(genero)}
                  onChange={handleGeneroChange}
                />
                {genero}
              </label>
            ))}
          </div>
        </aside>

        {/* Lista de livros */}
        <section className="lista-livros">
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro, index) => (
              <div
                className="livro-card"
                key={index}
                onClick={() =>
                  navigate(`/livro/${encodeURIComponent(livro.titulo)}`)
                }
              >
                <img src={livro.imagem} alt={livro.titulo} width="80" />
                <div>
                  <strong>{livro.titulo}</strong>
                  <p>Autor: {livro.autores}</p>
                  <p>
                    Data de Publicação: {livro.dataPublicacao || 'Indisponível'}{' '}
                    / Páginas: {livro.paginas || 'Indisponível'}
                  </p>
                  <div className="generos">
                    {Array.isArray(livro.genero) ? (
                      livro.genero.map(genero => (
                        <span key={genero} className="genero">
                          {genero}
                        </span>
                      ))
                    ) : (
                      <span className="genero">Gênero indisponível</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum livro encontrado.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default ExplorarLivros
