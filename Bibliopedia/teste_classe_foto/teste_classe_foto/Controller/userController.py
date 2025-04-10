from flask import make_response, jsonify,request, redirect,session,url_for
from authlib.integrations.flask_client import OAuth
from service import *
from config import *

class Usuario:
    def __init__(self, Nome,Email,Senha,Imagem='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',Status=0):
        self.nome = Nome
        self.email = Email
        self.senha = Senha
        self.imagem = Imagem
        self.status = Status
        
        

def listarTodosUsuario():    
    return make_response(
        jsonify(
            mensagem = "Listagem de user",
            usuarios = listagemTodosUsuariosService()
        )
    ) 

def salvarUsuario():    
    usuario = request.json
    DadosUsuario = Usuario(usuario.get('Nome'), usuario.get('Email'),usuario.get('Senha'))     
    verificacao = salvarUserService(DadosUsuario)
    if verificacao == ('Email já existe'):
        return  make_response(
            jsonify(
                mensagem = "Email já existe"
            )
        )
    elif verificacao == ("Campo email esta vazio"):
        return  make_response(
            jsonify(
                mensagem = "Campo email esta vazio"
            )
        )
    else:
        return  make_response(
            jsonify(
                mensagem = "Cadastro com sucesso!!"
            )
        )

def listarApenasUmUsuario(id):
    usuario = listarApenasUmUsuarioService(id)
    DadosUsuario={'idUsuario': usuario['idUsuario'], 
                  'NomeUsuario': usuario['NomeUsuario'], 
                  'EmailUsuario': usuario['EmailUsuario'], 
                  'SenhaUsuario': usuario['SenhaUsuario'], 
                  'ImagemUsuario': str(usuario['ImagemUsuario'])}       
    return make_response(
        jsonify(
            mensagem = "Listagem de user",
            usuario = DadosUsuario
        )
    ) 

def atualizarUmUsuario(id): 
    usuario = request.json
    DadosUsuario = Usuario(usuario.get('Nome'), usuario.get('Email'),usuario.get('Senha'),usuario.get('Imagem'))  
    if not isinstance(usuario.get('senha'), str):
        return make_response(
            jsonify(
              mensagem = "Senha deve ser uma string"  
            )
        )
    
    atualizarUmUsuarioService(id, DadosUsuario)          
    return make_response(
        jsonify(
            mensagem = "Usuário Atualizado com sucesso!!"
        )
    ) 

def removerUmUsuario(id):     
    removerUmUsuarioService(id)          
    return make_response(
        jsonify(
            mensagem = "Usuário Removido com sucesso!!"
        )
    )

def login():    
    usuario = request.json    
    login = loginService(usuario)
    if login == "Conta desativada":
        return make_response(
            jsonify(
                mensagem = "Conta ainda não foi ativada",
                status = 401
            )
        )
        
    elif login:
        session.permanent = True  
        session['user_id'] = login
        session['user_name'] = listarApenasUmUsuarioService(login)['NomeUsuario']
        session['user_email'] = usuario['Email']
        return jsonify(
                sessao = {'user_id':session['user_id'],
                'user_name':session['user_name'],
                'user_email': session['user_email']},
                mensagem = "Logim feito com Sucesso",
                status = 200
            )
        
    
    else:
        return make_response(
            jsonify(
                mensagem = "Email ou senha invalido",
                status = 401
            )
        )

def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    session.pop('user_email', None)
        
    return make_response(
            jsonify(
                mensagem="Logout realizado com sucesso",
                status=200
            ), 200
        )
    
def ativarConta(id):
    ativarservice(id)
    return make_response(
            jsonify(
                mensagem="Conta ativada com sucesso",
                status=200
            ), 200
        )


#GOOGLE

oauth = OAuth()



def configure_google_auth(app):
    oauth.init_app(app)
    oauth.register(
        name='google',
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={'scope': 'openid email profile'}
    )

def login_google():
    redirect_uri = url_for('blueprint.callback_google', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

def callback_google():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.get('https://openidconnect.googleapis.com/v1/userinfo').json()

    email = user_info['email']
    nome = user_info.get('name')
    imagem = user_info.get('picture', '')
    usuario = buscarUsuarioPorEmailService(email)

    if not usuario:
        senha='login_google'
        novo = Usuario(nome, email, senha, Imagem=imagem, Status=1)
        salvarUserService(novo)
        usuario = (email)

    session.permanent = True
    session['user_id'] = str(usuario['idUsuario'])
    session['user_name'] = usuario['NomeUsuario']
    session['user_email'] = usuario['EmailUsuario']
    
    return redirect(f'http://localhost:5173/login/callback?token={session["user_id"]}')