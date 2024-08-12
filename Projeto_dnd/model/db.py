from config.config import conexao

def AdicionarPersonagem(personagem):
    nome = personagem[0]
    vida = personagem[1]
    CA = personagem[2]
    nivel = personagem[3]
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            f'INSERT INTO personagens (idNome, Vida,CA,Nivel   ) VALUES ({nome},{vida},{CA},{nivel})'
        )
        conectar.commit()
    

def AtualizarPersonagem(personagem):
    nome = personagem[0]
    vida = personagem[1]
    nivel = personagem[2]
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            f'UPDATE personagens (idNome,Vida,CA,Nivel) VALUES ({nome},{vida},{nivel})'
        )
        conectar.commit()

def RemoverPersonagem(personagem):
    nome = personagem[0]
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            f"DELETE FROM personagens WHERE ({nome})"
        )
        conectar.commit()

def TodosPersonagens():
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            "SELECT * FROM personagens"
        )
        personagens = cursor.fetchone()
    return personagens
        

def RemoverTodosPersonagens():
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            "DELETE FROM personagens"
        )
        conectar.commit()