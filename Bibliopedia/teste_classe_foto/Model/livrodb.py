from config import conexao
from datetime import date

## Manuseio do banco de livros
def AdicionarLivrodb(dados):
    idLivro = dados['DadosLivro']['Id']
    nomeLivro = dados['DadosLivro']['Nome']
    generoLivro = str(dados['DadosLivro']['Genero'])
    autorlivro = str(dados['DadosLivro']['Autor'])
    idusuario = dados['idUsuario']

    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'INSERT INTO dados.livros (idAPI, livrosnome, livrosgenero,livrosautor,idUsuario) VALUES (%s, %s, %s,%s,%s)',
            (idLivro, nomeLivro,generoLivro,autorlivro,idusuario)
        )
        conectar.commit()
        
def ApenasUmLivrodb(id):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM dados.livros WHERE idAPI = %s", (id,)
            )
        livro = cursor.fetchone()
        return livro

def RemoverUmLivrodb(id):
        with conexao() as conectar:
            cursor = conectar.cursor()
            cursor.execute(
                    "DELETE FROM dados.livros WHERE idlivros = %s", (id,)
                    )
            conectar.commit()


def Livrosdb(idUsuario):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
         "SELECT livrosnome FROM dados.livros WHERE idUsuario=%s",(idUsuario,)
        )
        livros = cursor.fetchall()
    return livros

def DeletaLivroDB(dados):
    idusuario = dados['idUsuario']
    idLivro = dados['idLivro']
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'DELETE FROM dados.livros WHERE idAPI = %s AND idUsuario = %s',
            (idLivro, idusuario)
        )
        conectar.commit()
        cursor.close()



## Manuseio do banco de Comentarios

def SalvarComentariosdb(comentario):  
    idLivro = comentario['idLivro']
    idUsuario = comentario['idUsuario']
    comentarios = comentario['comentarios']
    data = date.today()
    nota = comentario['nota']
    with conexao() as conectar:
        cursor = conectar.cursor() 
        cursor.execute(
            'INSERT INTO dados.comentarios (idLivros,idUsuario,comentario,dataComentario,nota) VALUES (%s,%s, %s,%s,%s)',
            (idLivro, idUsuario,comentarios,data,nota,))
        conectar.commit()
        
def removerUmComentariosdb(id):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM dados.comentarios WHERE idComentarios = %s", (id,))
        conectar.commit()
        cursor.close()
        
        
def TodosComentariosdb(idLivro):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'SELECT usuarios.NomeUsuario, comentarios.comentario, comentarios.dataComentario, comentarios.nota FROM dados.comentarios JOIN dados.usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE comentarios.idLivros = %s',(idLivro,)
        )
        comentarios = cursor.fetchall()
        todosCometarios =[]
        for index in range(len(comentarios)):
            todosCometarios.append({
                    "UserName": comentarios[index][0],
                    "Comentario": comentarios[index][1],
                    "Date":comentarios[index][2],
                    "Rating": comentarios[index][3]
                })
        cursor.close()
        if comentarios == None:
            return "Ainda não exitem comentarios sobre o livro em questão "
    return todosCometarios

## Rating
def mediaNotas(idlivro):
    idLivro = idlivro.get("IdLivro")
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'SELECT AVG (nota) FROM dados.comentarios WHERE idLivros=%s',(idLivro,)
        )
        media = cursor.fetchone()
        cursor.close()
    return media
        

