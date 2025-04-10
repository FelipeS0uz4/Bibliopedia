import { Search, Star, BookOpen, Menu } from 'lucide-react'
import { Button } from '../components/Button'
import { BookCarousel } from './BookCarousel'
import './CoffeeLibrary.css'
import BarraNav from './../BarraNav/index'
import BarradePesquisa from '../BarraDePesquisa'

export default function CoffeeLibrary() {
  return (
    <div className="library-container">
      {/* Header */}
      <header className="library-header">
        <div className="header-content">
          <div className="logo">
            <BookOpen className="logo-icon" />
            <h1 className="logo-text">CoffeeReads</h1>
          </div>
          <BarraNav />
          <Button className="menu-button">
            <Menu className="menu-icon" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">Discover Your Next Great Read</h2>
        <p className="hero-text">
          Search, rate, and review books while enjoying your favorite brew
        </p>
        <div className="search-bar">
          <BarradePesquisa />
          <Button className="search-button">
            <Search className="search-icon" /> Search
          </Button>
        </div>
      </section>

      {/* Book Carousel */}
      <BookCarousel />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="section">
            <h5 className="title">About CoffeeReads</h5>
            <p className="text">
              Discover, rate, and review books while enjoying your favorite
              coffee. Join our community of book lovers and caffeine
              enthusiasts.
            </p>
          </div>

          <div className="styles.section">
            <h5 className="styles.title">Quick Links</h5>
            <ul className="styles.list">
              <li>
                <a href="#" className="link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Books
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="section">
            <h5 className="title">Connect With Us</h5>
            <div className="socialIcons">
              <a href="#" className="link">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="link">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="link">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <p>&copy; 2025 CoffeeReads. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
