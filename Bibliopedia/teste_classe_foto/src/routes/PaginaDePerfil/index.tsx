import type React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaginaDePerfil.css'

interface PaginaDePerfilProps {
  TokenId: string
}

export const PaginaDePerfil: React.FC<PaginaDePerfilProps> = ({ TokenId }) => {
  const navigate = useNavigate()

  const [antigoNome, setAntigoNome] = useState<string>('')
  const [nomeUsuario, setNomeUsuario] = useState<string>('')

  const [antigoEmail, setAntigoEmail] = useState<string>('')
  const [emailUsuario, setEmailUsuario] = useState<string>('')

  const [imagemPerfilAntiga, setImagemPerfilAntiga] = useState<string>('')
  const [imagemPerfil, setImagemPerfil] = useState<string>('')

  const getPerfil = async () => {
    if (TokenId) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5500/usuario/${TokenId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setAntigoNome(data.usuario.NomeUsuario)
          setAntigoEmail(data.usuario.EmailUsuario)
          setImagemPerfilAntiga(data.usuario.ImagemUsuario)
          console.log(data)
        } else {
          console.error('Erro ao obter o perfil do usuário', response.status)
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error)
      }
    }
  }

  useEffect(() => {
    getPerfil()
  }, [])

  const putPerfil = async (event: React.FormEvent<HTMLFormElement>) => {
    const payload = {
      NomeUsuario: nomeUsuario || antigoNome,
      EmailUsuario: emailUsuario || antigoEmail,
      ImagemUsuario: imagemPerfil || imagemPerfilAntiga,
    }

    try {
      const response = await fetch(`http://127.0.0.1:5500/usuario/${TokenId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.usuario) {
          setNomeUsuario(data.usuario.NomeUsuario)
          setEmailUsuario(data.usuario.EmailUsuario)
          setImagemPerfilAntiga(data.usuario.ImagemUsuario)
          setImagemPerfil('')

          console.log('Perfil atualizado com sucesso!')
        } else {
          console.error('Dados inesperados na resposta:', data)
        }
      } else {
        console.error('Erro ao atualizar o perfil', response.status)
      }
    } catch (error) {
      console.error('Erro na requisição', error)
    }
  }

  return (
    <div className="container-perfil">
      <h2>Editar Perfil</h2>

      <form onSubmit={putPerfil}>
        {/* Exibe a imagem de perfil atual ou nova */}
        {(imagemPerfil || imagemPerfilAntiga) && (
          <img
            src={imagemPerfil || imagemPerfilAntiga}
            alt="Imagem de perfil"
            className="imagem-perfil"
          />
        )}

        {/* Input para editar link da imagem */}
        <input
          type="text"
          placeholder={imagemPerfilAntiga || 'Link da imagem de perfil'}
          value={imagemPerfil}
          onChange={e => setImagemPerfil(e.target.value)}
        />

        {/* Input para editar o nome do usuário */}
        <input
          type="text"
          placeholder={antigoNome || 'Nome do usuário'}
          value={nomeUsuario}
          onChange={e => setNomeUsuario(e.target.value)}
        />

        {/* Input para editar o email do usuário */}
        <input
          type="email"
          placeholder={antigoEmail || 'Email do usuário'}
          value={emailUsuario}
          onChange={e => setEmailUsuario(e.target.value)}
        />

        <button type="submit" className="btn">
          Atualizar Perfil
        </button>

        <button type="button" className="btn" onClick={() => navigate('/home')}>
          Voltar à tela principal
        </button>
      </form>
    </div>
  )
}
