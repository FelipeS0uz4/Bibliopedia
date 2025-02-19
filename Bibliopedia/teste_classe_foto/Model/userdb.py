from config import conexao
from werkzeug.security import generate_password_hash, check_password_hash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def listagemTodosUsuariosdb():
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute('SELECT * FROM dados.usuarios')
        usuarios = cursor.fetchall()
    return usuarios

def salvarUsuariodb(usuario):
    username = usuario.nome    
    email = usuario.email
    senhaHashed = generate_password_hash(usuario.senha, method='pbkdf2:sha256')
    Imagem = usuario.imagem
    Status = usuario.status
    with conexao() as conectar:
        cursor = conectar.cursor() 
        cursor.execute("SELECT EmailUsuario FROM dados.usuarios WHERE EmailUsuario = %s",(email,))
        verficacao = cursor.fetchone()
    if verficacao:
        return "Email já existe"
    elif email==(''):
        return 'Campo email esta vazio'
    else:
        with conexao() as conectar:
            cursor = conectar.cursor() 
            cursor.execute(
                'INSERT INTO dados.usuarios (NomeUsuario, EmailUsuario, SenhaUsuario,ImagemUsuario,StatusUsuario) VALUES (%s,%s, %s,%s,%s)',
                (username, email, senhaHashed,Imagem,Status,))
            conectar.commit()
            cursor.execute(
                'SELECT idUsuario FROM dados.usuarios WHERE EmailUsuario = %s',(email,)
            )
            userid = cursor.fetchone()
            envio_de_email(username,userid[0],email)
    


def listarApenasUmUsuariodb(id):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)    
        cursor.execute("SELECT * FROM dados.usuarios WHERE idUsuario = %s", (id,))
        user = cursor.fetchone()
    return user         

def atualizarUmUsuariodb(id, usuario):
    username = usuario.nome    
    email = usuario.email
    senhaHashed = generate_password_hash(usuario.senha, method='pbkdf2:sha256')
    Imagem = usuario.imagem

    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("UPDATE dados.usuarios SET NomeUsuario  = %s EmailUsuario = %s, SenhaUsuario = %s, ImagemUsuario = %s  WHERE idUsuario = %s", 
                       (username, email, senhaHashed,Imagem,id,))
        conectar.commit()
        cursor.close()

def removerUmUsuariodb(id):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM dados.usuarios WHERE idUsuario = %s", (id,))
        conectar.commit()
        cursor.close()

def logindb(usuario):
    
    email = usuario.get('Email')
    senha = usuario.get('Senha')
    
    connection = conexao()
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM dados.usuarios WHERE EmailUsuario = %s", (email,))
    user = cursor.fetchone()
    
    cursor.close()
    connection.close()
    
    if user and check_password_hash(user['SenhaUsuario'],senha):
        if user["StatusUsuario"] == 1:
            return user['idUsuario']
        else:
            return "Conta desativada"
    else:
        return False
    
def ativarcontadb(id):
    ativador = 1
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("UPDATE dados.usuarios SET StatusUsuario  = %s WHERE idUsuario = %s", 
                       (ativador,id,))
        conectar.commit()
        cursor.close()
        
        
def envio_de_email(username,id_usuario,email_usuario):
    sender_email = ("bibliopedia413@gmail.com")
    sender_password = ("kdqu pqwk cbpr rcbk")
    recipient_email = email_usuario

    subject = "Ativação da sua conta"
    body = f"""
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ativação de Conta</title>
        <style>
            body {{
                background-color: #3A261D;
                font-family: Arial, sans-serif;
                color: #E3D2B5;
                text-align: center;
            }}
            table {{
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #E3D2B5;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                border-collapse: collapse;
            }}
            td {{
                padding: 15px;
                color: black;
            }}
            .logo {{
                width: 50px;
                vertical-align: middle;
            }}
            .title {{
                font-size: 24px;
                font-weight: bold;
                color: #3A261D;
                vertical-align: middle;
            }}
            .button {{
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #3A261D;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }}
        </style>
    </head>
    <body>
        <table>
            <tr>
                <td style="text-align: left; display: flex; align-items: center;">
                    <img src="https://lh3.googleusercontent.com/d/1k9cE1HhQeM1qhRuf2OIzHqfrDdnPyMYA" alt="Logo" class="logo">
                </td>
                <td style="text-align:left;"><span class="title">Bibliopedia</span></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center; font-size: 20px; font-weight: bold;">
                    Ativação de Conta
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <p>Olá, {username}</p>
                    <p>Para ativar sua conta, clique no botão abaixo:</p>
                    <p>
                        <a href="http://localhost:5173/activation/{id_usuario}" class="button">
                            Ativar Conta
                        </a>
                    </p>
                    <p>Se você não solicitou este email, ignore-o.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """


    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))


    try:
        with smtplib.SMTP("smtp.gmail.com",587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
        print("E-mail enviado com sucesso!")
        server.close()
    except Exception as e:
        print(f"Erro ao enviar o e-mail: {e}")
        server.close()



