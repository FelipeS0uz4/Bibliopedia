from livrodb import *
from userdb import *


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

##Comentario

def SalvarComentario(comentario):    
    return SalvarComentariosdb(comentario)   

def ServiceMediaNotas(idlivro):
    return mediaNotas(idlivro)

def Comentarios(idLivro):
    return TodosComentariosdb(idLivro)
