from flask import make_response, jsonify,request
import requests
from service import *

def PesquisarLivros(nome):
    procura = nome
    url = f'https://www.googleapis.com/books/v1/volumes?q={procura}'
    r =  requests.get(url)
    dicionario = r.json()
    itens = dicionario['items']
    return itens

    
def PesquisarNomes(nome):
    resultados = PesquisarLivros(nome)
    ListadeLivros=[]
    for i in range (len(resultados)):
        nomes = resultados[i]['volumeInfo']['title']
        ListadeLivros.append(nomes)
    return ListadeLivros
    
def PesquisarNome(nome):
    resultados = PesquisarLivros(nome)
    nome = resultados[0]['volumeInfo']['title']
    return nome
    
def PesquisarImagens(nome):
    resultados = PesquisarLivros(nome)
    ListadeImagens=[]
    for i in range (len(resultados)):
        try:
            imagens = resultados[i]['volumeInfo']['imageLinks']['thumbnail']
            ListadeImagens.append(imagens)
        except:
            imagens = FileNotFoundError
            ListadeImagens.append(imagens)
    return ListadeImagens

def PesquisarImagem(nome):
    resultado = PesquisarLivros(nome)
    try:
        imagem = resultado[0]['volumeInfo']['imageLinks']['thumbnail']
    except:
        imagem = FileNotFoundError
    return imagem

def PesquisarDescricao(nome):
    resultados = PesquisarLivros(nome)
    try:
        descricao = resultados[0]['volumeInfo']['description']
    except:
        descricao = FileNotFoundError
    return descricao

def PesquisarId(nome):
    resultados = PesquisarLivros(nome)
    descricao = resultados[0]['id']
    return descricao

def InformaçõesGerais(nome):
    dicionario = {"id":PesquisarId(nome),
                  "Nome":PesquisarNome(nome),
                  "imagem":PesquisarImagem(nome),
                  "Descricao":PesquisarDescricao(nome)}
    return dicionario


def TodosLivros():
    return make_response(
        jsonify(
            mensagem = 'Lista de livros',
            livros = ListagemTodosLivros()
        )
    )
    
def SalveLivro(livro):
    SalvarLivro(InformaçõesGerais(livro))
    return make_response(
        jsonify(
            Mensagem = "Livro salvo"
        )
    )

SalveLivro('José')