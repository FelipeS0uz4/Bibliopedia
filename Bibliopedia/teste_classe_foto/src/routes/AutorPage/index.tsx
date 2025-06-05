'use client'

import {
  BookOpen,
  Menu,
  User,
  Calendar,
  MapPin,
  Award,
  Coffee,
  Star,
  Book,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './AutorPage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Autor {
  nome: string
  top_work: string
  work_acount: string | null
  autor_code: number
  bio: string
  fotos: string
  birth_date: string
  top_subjects: []
  // ou `foto: string;` se vier como base64
}

// Dados de exemplo do autor

export default function AuthorPage() {
  const { nomeAutor } = useParams()
  const [authorData, setAuthorData] = useState<Autor | null>(null)

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5500/autor/${nomeAutor}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (response.ok) {
          const data = await response.json()
          setAuthorData(data)
          console.log(data)
        }
      } catch (error) {
        console.error('Erro ao Buscar dados do autor:', error)
      }
    }
    fetchAuthor()
  }, [nomeAutor])

  return (
    <div className="page-container">
      {/* Header */}

      {/* Main Content */}
      <main className="main-content">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/home" className="breadcrumb-link">
            Home
          </Link>{' '}
          &gt;{' '}
          <Link to="/authors" className="breadcrumb-link">
            Autores
          </Link>{' '}
          &gt; <span>{authorData?.nome}</span>
        </div>

        {/* Author Hero Section */}
        <section className="author-hero">
          <div className="author-hero-content">
            <div className="author-photo-container">
              <img
                src={authorData?.fotos[0] || '/placeholder.svg'}
                alt={`Foto de ${authorData?.nome}`}
                className="author-photo"
              />
            </div>
            <div className="author-info">
              <h1 className="author-name">{authorData?.nome}</h1>

              <div className="author-stats">
                <div className="stat-item">
                  <span className="stat-number">{authorData?.work_acount}</span>
                  <span className="stat-label">Obras Publicadas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {/* {authorData.stats.translations} */}
                  </span>
                  <span className="stat-label">Idiomas Traduzidos</span>
                </div>
                <div className="stat-item">
                  {/* <span className="stat-number">{authorData.stats.awards}</span> */}
                  <span className="stat-label">Prêmios Recebidos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {/* {authorData.stats.publishedYears} */}
                  </span>
                  <span className="stat-label">Período Ativo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Main Content */}
          <div>
            {/* Biography Section */}
            <section className="biography-section">
              <h2 className="section-title">
                <User className="h-6 w-6" />
                Biografia
              </h2>

              <p className="biography-text">{authorData?.bio}</p>

              <div className="biography-quote">
                {/* <Coffee className="h-5 w-5 inline mr-2" />"{authorData.quote}" */}
              </div>
            </section>

            {/* Major Works Section */}
            <section className="major-works-section">
              <h2 className="section-title">
                <Book className="h-6 w-6" />
                Obra Principal
              </h2>

              <div className="works-grid">
                <div className="work-item">
                  {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                  <img
                    //   src={work.cover || '/placeholder.svg'}
                    //   alt={`Capa de ${work.title}`}
                    className="work-cover"
                  />
                  <div className="work-info">
                    <h3 className="work-title">{authorData?.top_work}</h3>
                    <p className="work-year"></p>
                    <div className="work-rating">
                      <span className="rating-text"></span>
                    </div>
                    <p
                      className="biography-text"
                      style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}
                    >
                      {/* {work.description} */}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Personal Info */}
            <section className="personal-info-section">
              <h3 className="section-title" style={{ fontSize: '1.25rem' }}>
                <User className="h-5 w-5" />
                Informações Pessoais
              </h3>

              <ul className="info-list">
                <li className="info-item">
                  <Calendar className="info-icon" />
                  <span className="info-label">Nascimento:</span>
                  <span className="info-value">{authorData?.birth_date}</span>
                </li>
                <li className="info-item">
                  <MapPin className="info-icon" />
                  <span className="info-label">Local:</span>
                  <span className="info-value">
                    {/* {authorData.personalInfo.birthPlace} */}
                  </span>
                </li>
                <li className="info-item">
                  <Calendar className="info-icon" />
                  <span className="info-label">Falecimento:</span>
                  <span className="info-value">
                    {/* {authorData.personalInfo.deathDate} */}
                  </span>
                </li>
                <li className="info-item">
                  <User className="info-icon" />
                  <span className="info-label">Nacionalidade:</span>
                  <span className="info-value">
                    {/* {authorData.personalInfo.nationality} */}
                  </span>
                </li>
                <li className="info-item">
                  <BookOpen className="info-icon" />
                  <span className="info-label">Educação:</span>
                  <span className="info-value">
                    {/* {authorData.personalInfo.education} */}
                  </span>
                </li>
              </ul>
            </section>

            {/* Awards */}
            <section className="awards-section">
              <h3 className="section-title" style={{ fontSize: '1.25rem' }}>
                <Award className="h-5 w-5" />
                Principais Prêmios
              </h3>

              <ul className="awards-list"></ul>
            </section>

            {/* Genres */}
            <section className="genres-section">
              <h3 className="section-title" style={{ fontSize: '1.25rem' }}>
                <Book className="h-5 w-5" />
                Gêneros Literários
              </h3>

              <div className="genres-list">
                {authorData?.top_subjects.map((genre, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <span key={index} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Related Authors */}
        <section className="related-authors-section">
          <h2 className="section-title">
            <Users className="h-6 w-6" />
            Autores Relacionados
          </h2>

          <div className="related-authors-grid"></div>
        </section>
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
