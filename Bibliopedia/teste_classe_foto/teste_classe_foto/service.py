from Model.livrodb import *
from Model.userdb import *


KeyToken = None

def ListagemTodosLivros(idUsuario):
    return Livrosdb(idUsuario)

def Umlivro(nome):
    return ApenasUmLivrodb(nome)

def SalvarLivro(dado):
    return AdicionarLivrodb(dado)

def RemoverUm(idLivro):
    return RemoverUmLivrodb(idLivro)

## Usuarios

def listagemTodosUsuariosService():    
    return listagemTodosUsuariosdb()

def salvarUserService(usuario):    
    return salvarUsuariodb(usuario)   

def listarApenasUmUsuarioService(id):    
    return listarApenasUmUsuariodb(id) 

def atualizarUmUsuarioService(id, usuario):
    return atualizarUmUsuariodb(id, usuario) 

def removerUmUsuarioService(id):
    return removerUmUsuariodb(id) 

def loginService(usuario):
    return logindb(usuario) 

def ativarservice(id):
    return ativarcontadb(id)


def Emailesquecido(email):
    return emailesqueci(email)

def atualizacaoSenha(id,novasenha):
    return atualizasenha(id, novasenha)

##Comentario

def SalvarComentario(comentario):    
    return SalvarComentariosdb(comentario)   

def ServiceMediaNotas(idlivro):
    return mediaNotas(idlivro)

def Comentarios(idLivro):
    return TodosComentariosdb(idLivro)

def  buscarUsuarioPorEmailService(email):
    return buscarUsuariodbPorEmail(email)
