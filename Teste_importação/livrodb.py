from config import conexao

def AdicionarLivro(dados):
    idLivro = dados['id']
    nomeLivro = dados['Nome']
    imagemLivro = dados['imagem']
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'INSERT INTO dados.livros (idlivros, livrosnome, livrosimagem) VALUES (%s, %s, %s)',
            (idLivro, nomeLivro, imagemLivro)
        )
        conectar.commit()
        
def ApenasUmLivro(id):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM dados.livros WHERE idlivros = %s", (id,)
            )
        livro = cursor.fetchone()
        return livro

def RemoverUmLivro(id):
        with conexao() as conectar:
            cursor = conectar.cursor()
            cursor.execute(
                    "DELETE FROM dados.livros WHERE idlivros = %s", (id,)
                    )
            conectar.commit()


def Livrosdb():
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
         "SELECT livrosnome FROM dados.livros"
        )
        livros = cursor.fetchone()
    return livros

