from flask import make_response, jsonify,request, redirect,session,url_for
import requests
from service import *

## Livros

class Livro():
    def __init__(self,id,nome,imagem,descricao,genero,autor):
        self.id = id
        self.nome = nome
        self.imagem = imagem
        self.descricao = descricao
        self.genero = genero
        self.autor = autor

    def TodosLivros(idUsuario):
        return make_response(
            jsonify(
                mensagem = 'Lista de livros',
                livros = ListagemTodosLivros(idUsuario)
            )
        )
        
    def SalveLivro():
        livro = request.json
        dicionario_dados = {'idUsuario' : livro.get('IdUsuario'),
                            'DadosLivro' : Livro.InformaçõesGerais(livro.get('Nome'))
                            }
        SalvarLivro(dicionario_dados)
        return make_response(
            jsonify(
                Mensagem = "Livro salvo"
            )
        )
        
    def ListadeLivros(pesquisa):
        livros = Livro.PesquisarNomes(pesquisa)
        resposta = {}
        for i in livros:
            resposta[i] = Livro.InformaçõesGerais(i)
        return resposta
    
    def DeletarLivro(idLivro):
        livro = request.json
        dicionario_dados = {'idUsuario' : livro.get('idUser'),
                            'idLivro' : livro.get('idLivro')
                            }
        DeletaLivroDB(dicionario_dados)
        return make_response(
            jsonify(
                mensagem = 'Livro excluido'
            )
        )


    ##Pesquisar dados API Google Books
    def PesquisarLivros(nome):
        procura = nome
        url = f'https://www.googleapis.com/books/v1/volumes?q={procura}'
        r =  requests.get(url)
        dicionario = r.json()
        itens = dicionario['items']
        return itens
    
    def PesquisarPeloId(id):
        url = f'https://www.googleapis.com/books/v1/volumes/{id}'
        r =  requests.get(url)
        dicionario = r.json()
        return dicionario

    def PesquisaProfunda(urlLivro):
        url = urlLivro
        r =  requests.get(url)
        dicionario = r.json()
        return dicionario
        
    def PesquisarAutor(nome):
        id = Livro.PesquisarId(nome)
        resultados = Livro.PesquisarPeloId(id)
        try:
            return resultados['volumeInfo'].get('authors', [])
        except (IndexError, KeyError, TypeError):
            return []
        
    def PesquisarNomes(nome):
        resultados = Livro.PesquisarLivros(nome)
        ListadeLivros=[]
        for i in range (len(resultados)):
            nomes = resultados[i]['volumeInfo']['title']
            ListadeLivros.append(nomes)
        return ListadeLivros

    def PesquisarGenero(nome):
        listaGeneros = set()     
        id = Livro.PesquisarId(nome)
        resultados = Livro.PesquisarPeloId(id)
        if resultados and 'selfLink' in resultados:
            categorias = resultados.get('volumeInfo', {}).get('categories', [])
            for categoria in categorias:
                partes = [parte.strip() for parte in categoria.split('/')]
                listaGeneros.update(partes)
        return list(listaGeneros)
        
    def PesquisarNome(nome):
        id = Livro.PesquisarId(nome)
        resultados = Livro.PesquisarPeloId(id)
        return resultados['volumeInfo']['title'] if resultados else None
        
    def PesquisarImagens(nome):
        ListadeImagens=[]
        for e in nome:
            resultados = Livro.PesquisarLivros(e)
            for i in range (len(resultados)):
                try:
                    imagens = resultados[i]['volumeInfo']['imageLinks']['thumbnail']
                    ListadeImagens.append(imagens)
                except:
                    imagens = FileNotFoundError
                    break
        return ListadeImagens

    def PesquisarImagem(nome):
        id = Livro.PesquisarId(nome)
        resultados = Livro.PesquisarPeloId(id)
        try:
            return resultados['volumeInfo']['imageLinks']['thumbnail']
        except (IndexError, KeyError, TypeError):
            return None

    def PesquisarDescricao(nome):
        id = Livro.PesquisarId(nome)
        resultados = Livro.PesquisarPeloId(id)
        try:
            return resultados['volumeInfo']['description']
        except (IndexError, KeyError, TypeError):
            return None

    def PesquisarId(nome):
        resultados = Livro.PesquisarLivros(nome)
        if not resultados:
            return None 
        for livro in resultados:
            if livro['volumeInfo'].get('title', '').lower() == nome.lower():
                return livro.get('id')
        return None
    
    def ComprarLivro(idLivro):
        resultado = Livro.PesquisarPeloId(idLivro)
        try:
            if resultado['saleInfo']['saleability'] == "FOR_SALE":
                dados = {"valor": resultado["saleInfo"]["retailPrice"]["amount"],
                        "moeda":resultado["saleInfo"]["retailPrice"]["currencyCode"],
                        "link":resultado["saleInfo"]["buyLink"]}
            else:
                dados = "Sem possiblidade para compra"
        except:
            dados = "Sem possiblidade para compra"
        return dados
        

    def InformaçõesGerais(nome):
        dicionario = {"Id":Livro.PesquisarId(nome),
                    "Nome":Livro.PesquisarNome(nome),
                    "Imagem":Livro.PesquisarImagem(nome),
                    "Descricao":Livro.PesquisarDescricao(nome),
                    "Genero":Livro.PesquisarGenero(nome),
                    "Autor":Livro.PesquisarAutor(nome),
                    "Comprar":Livro.ComprarLivro(Livro.PesquisarId(nome))}
        return dicionario

    def InformaçõesGeraisdicionario(nome):
        Livro.id = Livro.PesquisarId(nome)
        Livro.nome = Livro.PesquisarNome(nome)
        Livro.imagem  = Livro.PesquisarImagem(nome)
        Livro.descricao = Livro.PesquisarDescricao(nome)
        Livro.genero = Livro.PesquisarGenero(nome)
        Livro.autor = Livro.PesquisarAutor(nome)
        return Livro
    
    def SalveLivroteste(nome,livro):
        dicionario_dados = {'idUsuario' : nome,
                            'DadosLivro' : Livro.InformaçõesGerais(livro)
                            }
        SalvarLivro((dicionario_dados))
        return make_response(
            jsonify(
                Mensagem = "Livro salvo"
            )
        )



##Comentario

def salvarComentario():    
    comentario = request.json 
    comentarioCorrigido = {'idLivro': Livro.PesquisarId(comentario.get("LivroId")),
                            'idUsuario' : comentario.get('userId'),
                            'comentarios' : comentario.get('comentario'),
                            'nota':comentario.get('rating')}
    SalvarComentario(comentarioCorrigido)
    return make_response(
        jsonify(
            mensagem = "Comentario registrado"
        )
    )
    
def Vercomentarios(idLivro):
    Idapi = Livro.PesquisarId(idLivro)
    return Comentarios(Idapi)

    
##Rating
def notaLivro(idLivro):
    notaMedia = ServiceMediaNotas(idLivro)
    return make_response(
        jsonify(
            mensagem = "Nota do livro",
            nota = notaMedia
        )
    )
    

