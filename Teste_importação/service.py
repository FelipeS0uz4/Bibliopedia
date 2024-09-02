from livrodb import *


def ListagemTodosLivros():
    return Livrosdb()

def Umlivro(nome):
    return ApenasUmLivro(nome)

def SalvarLivro(dado):
    return AdicionarLivro(dado)

def RemoverUm(id):
    return RemoverUmLivro(id)


