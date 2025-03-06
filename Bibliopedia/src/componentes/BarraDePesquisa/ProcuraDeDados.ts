import axios from 'axios'

// Tipos
interface VolumeInfo {
  publishedDate: string
  pageCount: number
  averageRating: number
  title: string
  authors?: string[]
  imageLinks?: {
    smallThumbnail?: string
    thumbnail?: string // Adiciona o tipo `thumbnail`
  }
  description?: string
}

interface GoogleBooksResponse {
  items: Item[]
}

interface Item {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  id: any
  volumeInfo: VolumeInfo
}

interface LivroDetalhado {
  titulo: string
  autores: string
  imagem: string
  dataPublicacao: string
  paginas: number
  genero: string[]
}
const generoMap: Record<string, string> = {
  Action: 'Action',
  Adventure: 'Adventure',
  Biography: 'Biography',
  Classics: 'Classics',
  Comedy: 'Comedy',
  Crime: 'Crime',
  Drama: 'Drama',
  Dystopian: 'Dystopian',
  Fantasy: 'Fantasy',
  Fiction: 'Fiction',
  'Graphic Novel': 'Graphic Novel',
  History: 'History',
  Horror: 'Horror',
  Humor: 'Humor',
  'Literary Fiction': 'Literary Fiction',
  Magic: 'Magic',
  Manga: 'Manga',
  Memoir: 'Memoir',
  Mystery: 'Mystery',
  Mythology: 'Mythology',
  'Non-fiction': 'Non-fiction',
  Paranormal: 'Paranormal',
  Philosophy: 'Philosophy',
  Poetry: 'Poetry',
  Psychological: 'Psychological',
  Religion: 'Religion',
  Romance: 'Romance',
  Satire: 'Satire',
  Science: 'Science',
  'Science Fiction': 'Science Fiction',
  'Self-help': 'Self-help',
  'Short Stories': 'Short Stories',
  Spirituality: 'Spirituality',
  Sports: 'Sports',
  Supernatural: 'Supernatural',
  Suspense: 'Suspense',
  Thriller: 'Thriller',
  Travel: 'Travel',
  'Urban Fantasy': 'Urban Fantasy',
  War: 'War',
  Western: 'Western',
  'Young Adult': 'Young Adult',
}

// Funções de busca
export async function PesquisarLivros(nome: string): Promise<Item[]> {
  const procura = nome
  const url = `https://www.googleapis.com/books/v1/volumes?q=${procura}`
  try {
    const response = await axios.get<GoogleBooksResponse>(url)
    const dicionario = response.data
    const itens = dicionario.items || [] // Verificação adicionada
    return itens
  } catch (error) {
    console.error(error)
    return [] // Retorna um array vazio em caso de erro
  }
}

export async function PesquisarNomes(nome: string): Promise<string[]> {
  const resultados = await PesquisarLivros(nome)
  const ListadeLivros: string[] = []
  if (resultados.length) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    resultados.forEach(item => {
      const nomes = item.volumeInfo.title
      ListadeLivros.push(nomes)
    })
  }
  return ListadeLivros
}

export async function PesquisarNome(nome: string): Promise<string> {
  const resultados = await PesquisarLivros(nome)
  if (resultados.length > 0) {
    const nomeLivro = resultados[0].volumeInfo.title
    return nomeLivro
  }
  return '' // Retorna uma string vazia caso não haja resultados
}

export async function PesquisarImagens(nome: string): Promise<string[]> {
  const resultados = await PesquisarLivros(nome)
  const ListadeImagens: string[] = []
  if (resultados.length) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    resultados.forEach(item => {
      try {
        const imagens =
          item.volumeInfo.imageLinks?.thumbnail || 'FileNotFoundError' // Agora verifica corretamente `thumbnail`
        ListadeImagens.push(imagens)
      } catch (error) {
        ListadeImagens.push('FileNotFoundError')
      }
    })
  }
  return ListadeImagens
}

export async function PesquisarImagem(nome: string): Promise<string> {
  const resultado = await PesquisarLivros(nome)
  if (resultado.length > 0) {
    const imagem =
      resultado[0].volumeInfo.imageLinks?.thumbnail || 'FileNotFoundError'
    return imagem
  }
  return 'FileNotFoundError'
}

export async function PesquisarDescricao(nome: string): Promise<string> {
  const resultados = await PesquisarLivros(nome)
  if (resultados.length > 0) {
    const descricao =
      resultados[0].volumeInfo.description || 'Descrição não disponível'
    return descricao
  }
  return 'Descrição não disponível'
}

export async function InformacoesGerais(nome: string): Promise<{
  Nome: string
  imagem: string
  Descricao: string
  autor: string
  genero: string
}> {
  // Primeiro, pesquise os livros para encontrar o ID do primeiro resultado relevante
  const livros = await PesquisarLivros(nome)
  if (livros.length === 0) {
    throw new Error('Livro não encontrado')
  }

  // Pegue o primeiro livro na lista de resultados
  const primeiroLivro = livros[0]
  const livroId = primeiroLivro.id

  // Obtenha as informações de nome, imagem e descrição
  const dicionario = {
    Nome: await PesquisarNome(nome),
    imagem: await PesquisarImagem(nome),
    Descricao: await PesquisarDescricao(nome),
  }

  // Obtenha o autor e gênero usando o ID do livro
  const { autor, genero } = await PesquisarGeneroEAutor(livroId)

  // Adicione o autor e gênero ao objeto dicionário
  return {
    ...dicionario,
    autor,
    genero,
  }
}

export async function DadosLivrosDetalhados(
  nome: string
): Promise<LivroDetalhado[]> {
  const resultados = await PesquisarLivros(nome)
  const listaDeLivros: LivroDetalhado[] = []

  if (resultados.length) {
    await Promise.all(
      resultados.map(async item => {
        const titulo = item.volumeInfo.title
        const imagem =
          item.volumeInfo.imageLinks?.thumbnail || 'Imagem não disponível'
        const dataPublicacao =
          item.volumeInfo.publishedDate || 'Data não disponível'
        const paginas = item.volumeInfo.pageCount || 0

        // Buscar autor e gênero separadamente
        const { autor, genero } = await PesquisarGeneroEAutor(item.id)

        listaDeLivros.push({
          titulo,
          autores: autor,
          imagem,
          dataPublicacao,
          paginas,
          genero: genero, // Transformando string em array
        })
      })
    )
  }

  return listaDeLivros
}

function formatarGeneros(categorias: string[]): string[] {
  if (!categorias || categorias.length === 0) {
    return ['Gênero desconhecido']
  }

  const generosFormatados = new Set<string>()

  // biome-ignore lint/complexity/noForEach: <explanation>
  categorias.forEach(categoria => {
    // Divide pelo "/" ou "&" para separar os subgêneros
    const partes = categoria.split(/\/|&/).map(parte => parte.trim())

    // biome-ignore lint/complexity/noForEach: <explanation>
    partes.forEach(parte => {
      if (generoMap[parte]) {
        generosFormatados.add(generoMap[parte])
      } else {
        generosFormatados.add(parte)
      }
    })
  })

  return Array.from(generosFormatados)
}

export async function PesquisarGeneroEAutor(
  id: string
): Promise<{ autor: string; genero: string[] }> {
  const url = `https://www.googleapis.com/books/v1/volumes/${id}`

  try {
    const response = await axios.get(url)
    const data = response.data

    const autor = data.volumeInfo.authors
      ? data.volumeInfo.authors.join(', ')
      : 'Autor desconhecido'

    const categorias = data.volumeInfo.categories || []
    const generos = formatarGeneros(categorias)

    return { autor, genero: generos }
  } catch (error) {
    console.error('Erro ao buscar o gênero e autor:', error)
    return { autor: 'Desconhecido', genero: ['Gênero desconhecido'] }
  }
}
