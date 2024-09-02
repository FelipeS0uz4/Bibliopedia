import axios from 'axios'

// Funções de busca
export async function PesquisarLivros(nome) {
    const procura = nome;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${procura}`;
    try {
        const response = await axios.get(url);
        const dicionario = response.data;
        const itens = dicionario.items || []; // Verificação adicionada
        return itens;
    } catch (error) {
        console.error(error);
        return []; // Retorna um array vazio em caso de erro
    }
}

export async function PesquisarNomes(nome) {
    const resultados = await PesquisarLivros(nome);
    const ListadeLivros = [];
    if (resultados.length) {  // Verifica se `resultados` não está vazio
        resultados.forEach(item => {
            const nomes = item.volumeInfo.title;
            ListadeLivros.push(nomes);
        });
    }
    return ListadeLivros;
}

export async function PesquisarNome(nome) {
    const resultados = await PesquisarLivros(nome);
    if (resultados.length > 0) {
        const nomeLivro = resultados[0].volumeInfo.title;
        return nomeLivro;
    }
    return ''; // Retorna uma string vazia caso não haja resultados
}

export async function PesquisarImagens(nome) {
    const resultados = await PesquisarLivros(nome);
    const ListadeImagens = [];
    if (resultados.length) {  // Verifica se `resultados` não está vazio
        resultados.forEach(item => {
            try {
                const imagens = item.volumeInfo.imageLinks?.smallThumbnail || 'FileNotFoundError'; // Usando Optional Chaining
                ListadeImagens.push(imagens);
            } catch (error) {
                ListadeImagens.push('FileNotFoundError');
            }
        });
    }
    return ListadeImagens;
}

export async function PesquisarImagem(nome) {
    const resultado = await PesquisarLivros(nome);
    if (resultado.length > 0) {
        const imagem = resultado[0].volumeInfo.imageLinks?.smallThumbnail || 'FileNotFoundError';
        return imagem;
    }
    return 'FileNotFoundError';
}

export async function PesquisarDescricao(nome) {
    const resultados = await PesquisarLivros(nome);
    if (resultados.length > 0) {
        const descricao = resultados[0].volumeInfo.description || 'Descrição não disponível';
        return descricao;
    }
    return 'Descrição não disponível';
}

export async function InformacoesGerais(nome) {
    const dicionario = {
        Nome: await PesquisarNome(nome),
        imagem: await PesquisarImagem(nome),
        Descricao: await PesquisarDescricao(nome)
    };
    console.log(dicionario);
    return dicionario;
}

//Exemplo de uso
//PesquisarNomes('Harry Potter').then(nomes => console.log(nomes));
