import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import LayoutAvaliacao from './routes/LayoutDeAvaliacao'
import PaginaDeEntrada from './routes/PaginaDeLogin'
import PaginaParaCriacao from './componentes/CriaçãodeLogin'
import SecaodeReel from './componentes/Secao_Primeira'
import { PaginaDePerfil } from './routes/PaginaDePerfil'
import FiltroDeLivros from './routes/ExplorarLivros/ExplorarLivros'
import { Biblioteca } from './routes/Biblioteca'
import EmailActivation from './routes/email-verification'
import LoginCallback from './routes/PaginaDeLogin/LoginCallBack'
import ResetPassword from './routes/TrocaDeSenha'
import VerifyEmail from './routes/ConfimaçãoEmail'
import AuthorPage from './routes/AutorPage'
const isAuthenticated = !!localStorage.getItem('user_token')

const userToken = localStorage.getItem('user_token')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'livro/:livroId', // Caminho correto para a rota
        element: <LayoutAvaliacao />,
      },
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: '/explorar',
        element: <FiltroDeLivros />,
      },
    ],
  },
  {
    path: 'home',
    element: <SecaodeReel />,
  },
  {
    path: 'login',
    element: <PaginaDeEntrada />,
  },
  {
    path: 'cadastro',
    element: <PaginaParaCriacao />,
  },
  {
    path: 'perfil',
    element: userToken ? (
      <PaginaDePerfil TokenId={userToken} />
    ) : (
      <Navigate to="/login" />
    ),
  },
  { path: 'biblioteca', element: <Biblioteca /> },
  {
    path: 'activation/:id',
    element: <EmailActivation />,
  },
  {
    path: 'login/callback',
    element: <LoginCallback />,
  },
  {
    path: 'Reset/:id',
    element: <ResetPassword />,
  },
  {
    path: 'VerificarEmail',
    element: <VerifyEmail />,
  },
  {
    path: 'author/:nomeAutor',
    element: <AuthorPage/>
  }
])

// Renderiza o RouterProvider com as rotas configuradas
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Tipagem correta para TypeScript
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
