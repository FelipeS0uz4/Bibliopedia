import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LayoutAvaliacao from './routes/LayoutDeAvaliacao';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Home from './routes/Home/Home';

// Definindo as rotas da aplicação
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"home",
        element:<Home />
      },
      {
        path: "livro/:livroId",  // Caminho correto para a rota
        element: <LayoutAvaliacao />,
      },
    ],
  },

]);

// Renderiza o RouterProvider com as rotas configuradas
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);