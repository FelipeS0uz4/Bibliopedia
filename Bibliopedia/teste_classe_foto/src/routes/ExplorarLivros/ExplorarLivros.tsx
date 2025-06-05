'use client'

import { useState, useEffect, useMemo } from 'react'
import { BookOpen, Menu, Search, Filter, Star, X, BookX } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
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

export default function ExploreBooks() {
  const [livros, setLivros] = useState<LivroDetalhado[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [yearRange, setYearRange] = useState([1800, 2024])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [sortBy, setSortBy] = useState('title')
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const allGenres = useMemo(
    () => [...new Set(livros.flatMap(book => book.genero))].sort(),
    [livros]
  )

  const allAuthors = useMemo(
    () => [...new Set(livros.map(book => book.autores))].sort(),
    [livros]
  )
  const booksPerPage = 8

  // Filtrar livros
  const filteredBooks = livros.filter(book => {
    const matchesSearch =
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.autores.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenres =
      selectedGenres.length === 0 ||
      book.genero.some(genre => selectedGenres.includes(genre))

    const matchesAuthors =
      selectedAuthors.length === 0 || selectedAuthors.includes(book.autores)

    return (
      matchesSearch &&
      matchesGenres &&
      matchesAuthors &&
      matchesSearch &&
      matchesAuthors
    )
  })
  const navigate = useNavigate()

  // Ordenar livros
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.titulo.localeCompare(b.titulo)
      case 'author':
        return a.autores.localeCompare(b.autores)
      default:
        return 0
    }
  })

  // Paginação
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage)
  const startIndex = (currentPage - 1) * booksPerPage
  const paginatedBooks = sortedBooks.slice(
    startIndex,
    startIndex + booksPerPage
  )
  const searchQuery = new URLSearchParams(location.search).get('query')

  useEffect(() => {
    const buscarLivros = async () => {
      if (!searchQuery) return

      try {
        const resultados = await DadosLivrosDetalhados(searchQuery)

        // Garante que resultados seja sempre um array válido
        if (Array.isArray(resultados)) {
          setLivros(resultados)
          console.log(resultados)
        } else {
          setLivros([])
          console.warn('Os dados recebidos não são um array:', resultados)
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error)
        setLivros([]) // Garante que livros não fique undefined
      }
    }

    buscarLivros()
  }, [searchQuery])

  // Resetar página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchTerm,
    selectedGenres,
    selectedAuthors,
    yearRange,
    ratingFilter,
    sortBy,
  ])

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres(prev => [...prev, genre])
    } else {
      setSelectedGenres(prev => prev.filter(g => g !== genre))
    }
  }

  const handleAuthorChange = (author: string, checked: boolean) => {
    if (checked) {
      setSelectedAuthors(prev => [...prev, author])
    } else {
      setSelectedAuthors(prev => prev.filter(a => a !== author))
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedGenres([])
    setSelectedAuthors([])
    setYearRange([1800, 2024])
    setRatingFilter(0)
    setSortBy('title')
  }

  const handleSearch = () => {
    setIsLoading(true)
    // Simular busca
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const FiltersContent = () => (
    <>
      <div className="filter-section">
        <label className="filter-label">Gêneros</label>
        <div className="checkbox-group">
          {allGenres.map(genre => (
            <div key={genre} className="checkbox-item">
              <input
                type="checkbox"
                id={`genre-${genre}`}
                className="checkbox-input"
                checked={selectedGenres.includes(genre)}
                onChange={e => handleGenreChange(genre, e.target.checked)}
              />
              <label htmlFor={`genre-${genre}`} className="checkbox-label">
                {genre}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Autores</label>
        <div className="checkbox-group">
          {allAuthors.slice(0, 8).map(author => (
            <div key={author} className="checkbox-item">
              <input
                type="checkbox"
                id={`author-${author}`}
                className="checkbox-input"
                checked={selectedAuthors.includes(author)}
                onChange={e => handleAuthorChange(author, e.target.checked)}
              />
              <label htmlFor={`author-${author}`} className="checkbox-label">
                {author}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Ano de Publicação</label>
        <input
          type="range"
          min="1800"
          max="2024"
          value={yearRange[0]}
          onChange={e =>
            setYearRange([Number.parseInt(e.target.value), yearRange[1]])
          }
          className="filter-range"
        />
        <input
          type="range"
          min="1800"
          max="2024"
          value={yearRange[1]}
          onChange={e =>
            setYearRange([yearRange[0], Number.parseInt(e.target.value)])
          }
          className="filter-range"
        />
        <div className="range-labels">
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Avaliação Mínima</label>
        <select
          value={ratingFilter}
          onChange={e => setRatingFilter(Number.parseFloat(e.target.value))}
          className="filter-select"
        >
          <option value={0}>Qualquer avaliação</option>
          <option value={4.5}>4.5+ estrelas</option>
          <option value={4.0}>4.0+ estrelas</option>
          <option value={3.5}>3.5+ estrelas</option>
          <option value={3.0}>3.0+ estrelas</option>
        </select>
      </div>

      <button onClick={clearAllFilters} className="clear-filters-button">
        Limpar Filtros
      </button>
    </>
  )

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <BookOpen className="h-8 w-8" />
            <h1 className="site-title">CoffeeReads</h1>
          </div>
          <nav className="nav-menu">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/books" className="nav-link">
              Livros
            </Link>
            <Link href="/authors" className="nav-link">
              Autores
            </Link>
            <Link href="/categories" className="nav-link">
              Categorias
            </Link>
            <Link href="/about" className="nav-link">
              Sobre
            </Link>
          </nav>
          <button className="mobile-menu-button">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Explorar Livros</h1>
          <p className="page-subtitle">
            Descubra sua próxima grande leitura em nossa vasta coleção de livros
          </p>
        </div>

        {/* Search Section */}
        <section className="search-section">
          <div className="search-container">
            <div className="search-input-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por título, autor ou palavra-chave..."
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button onClick={handleSearch} className="search-button">
              <Search className="h-5 w-5" />
              Buscar
            </button>
          </div>
        </section>

        {/* Content Layout */}
        <div className="content-layout">
          {/* Desktop Filters Sidebar */}
          <aside className="filters-sidebar">
            <h2 className="filters-title">
              <Filter className="h-5 w-5" />
              Filtros
            </h2>
            <FiltersContent />
          </aside>

          {/* Results Section */}
          <section className="results-section">
            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="mobile-filters-toggle"
            >
              <Filter className="h-5 w-5 inline mr-2" />
              Filtros
            </button>

            {/* Results Header */}
            <div className="results-header">
              <div className="results-count">
                {filteredBooks.length} livros encontrados
              </div>
              <div className="sort-container">
                <label className="sort-label">Ordenar por:</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="title">Título</option>
                  <option value="author">Autor</option>
                  <option value="year">Ano (mais recente)</option>
                  <option value="rating">Avaliação</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            )}

            {/* Books Grid */}
            {!isLoading && paginatedBooks.length > 0 && (
              <div className="books-grid">
                {paginatedBooks.map(book => (
                  <div key={book.titulo} className="book-card">
                    <div className="book-content">
                      <img
                        src={book.imagem || '/placeholder.svg'}
                        alt={`Capa de ${book.titulo}`}
                        className="book-cover"
                      />
                      <div className="book-info">
                        <h3 className="book-title" onClick={()=>{navigate(`/livro/${book.titulo}`)}}>{book.titulo}</h3>
                        <Link
                          to={`/author/${book.autores}`}
                          className="book-author"
                        >
                          {book.autores}
                        </Link>
                        <div className="book-year">{book.dataPublicacao}</div>
                        <div className="book-rating">
                          <span className="rating-text">{book.rating}</span>
                        </div>
                        <div className="book-genres">
                          {book.genero.map(genre => (
                            <span key={genre} className="genre-tag">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && paginatedBooks.length === 0 && (
              <div className="no-results">
                <BookX className="no-results-icon" />
                <h3 className="no-results-title">Nenhum livro encontrado</h3>
                <p className="no-results-text">
                  Tente ajustar seus filtros ou termos de busca
                </p>
                <button
                  onClick={clearAllFilters}
                  className="clear-filters-button"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && paginatedBooks.length > 0 && totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Anterior
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page}>...</span>
                  }
                  return null
                })}

                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Próxima
                </button>

                <div className="pagination-info">
                  Página {currentPage} de {totalPages}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="mobile-filters-overlay">
            <div className="mobile-filters-content">
              <div className="mobile-filters-header">
                <h2 className="mobile-filters-title">Filtros</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="close-filters-button"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FiltersContent />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h5 className="footer-heading">Sobre CoffeeReads</h5>
              <p className="footer-text">
                Descubra, avalie e comente livros enquanto desfruta do seu café
                favorito. Junte-se à nossa comunidade de amantes de livros e
                entusiastas da cafeína.
              </p>
            </div>
            <div>
              <h5 className="footer-heading">Links Rápidos</h5>
              <ul className="footer-links">
                <li className="footer-link">
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="footer-link">
                  <Link href="/books" className="nav-link">
                    Livros
                  </Link>
                </li>
                <li className="footer-link">
                  <Link href="/authors" className="nav-link">
                    Autores
                  </Link>
                </li>
                <li className="footer-link">
                  <Link href="/about" className="nav-link">
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="footer-heading">Conecte-se Conosco</h5>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CoffeeReads. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
