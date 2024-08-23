const axios = require('axios');

async function PesquisarLivros(nome) {
    const procura = nome;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${procura}`;
    try {
        const response = await axios.get(url);
        const dicionario = response.data;
        const itens = dicionario.items;
        return itens;
    } catch (error) {
        console.error(error);
    }
}

async function PesquisarNomes(nome) {
    const resultados = await PesquisarLivros(nome);
    const ListadeLivros = [];
    resultados.forEach(item => {
        const nomes = item.volumeInfo.title;
        ListadeLivros.push(nomes);
    });
    return ListadeLivros;
}

async function PesquisarNome(nome) {
    const resultados = await PesquisarLivros(nome);
    const nomeLivro = resultados[0].volumeInfo.title;
    return nomeLivro;
}

async function PesquisarImagens(nome) {
    const resultados = await PesquisarLivros(nome);
    const ListadeImagens = [];
    resultados.forEach(item => {
        try {
            const imagens = item.volumeInfo.imageLinks.smallThumbnail;
            ListadeImagens.push(imagens);
        } catch (error) {
            ListadeImagens.push('FileNotFoundError');
        }
    });
    return ListadeImagens;
}

async function PesquisarImagem(nome) {
    const resultado = await PesquisarLivros(nome);
    const imagem = resultado[0].volumeInfo.imageLinks.smallThumbnail;
    return imagem;
}

async function PesquisarDescricao(nome) {
    const resultados = await PesquisarLivros(nome);
    const descricao = resultados[0].volumeInfo.description;
    return descricao;
}

async function InformacoesGerais(nome) {
    const dicionario = {
        Nome: await PesquisarNome(nome),
        imagem: await PesquisarImagem(nome),
        Descricao: await PesquisarDescricao(nome)
    };
    console.log(dicionario);
    return dicionario;
}

// Exemplo de uso
PesquisarNomes('Harry Potter').then(nomes => console.log(nomes));

// Exporte as funções que você quer usar em outros arquivos
module.exports = {
    PesquisarLivros,
    // Adicione aqui outras funções que você queira exportar
    PesquisarNomes,
    PesquisarNome,
    PesquisarImagens,
    PesquisarImagem,
    PesquisarDescricao,
    InformacoesGerais
};