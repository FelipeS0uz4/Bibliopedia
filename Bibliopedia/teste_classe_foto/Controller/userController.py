from flask import make_response, jsonify,request, redirect,session,url_for
from authlib.integrations.flask_client import OAuth
from service import *
from config import *
import time

class Usuario:
    def __init__(self, Nome,Email,Senha,Imagem=None ,Status=0,TypeClient="Client"):
        self.nome = Nome
        self.email = Email
        self.senha = Senha
        self.imagem = Imagem or 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg'
        self.status = Status
        self.typeClient = TypeClient
        
class Autor(Usuario):
    def __init__(self, nome, email, senha, imagem=None, status=0):
        super().__init__(nome, email, senha, imagem, status, TypeClient="Author")
           

def listarTodosUsuario():    
    return make_response(
        jsonify(
            mensagem = "Listagem de user",
            usuarios = listagemTodosUsuariosService()
        )
    ) 

def salvarUsuario(TypeClient):    
    usuario = request.json      ##E adicione um TypeClient = usuario.get('TypeClient')
    if TypeClient == 'Client':
        DadosUsuario = Usuario(usuario.get('Nome'), usuario.get('Email'),usuario.get('Senha'))     
    elif TypeClient == 'Author':
        DadosUsuario = Autor(usuario.get('Nome'), usuario.get('Email'),usuario.get('Senha'))
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

def EsqueciaSenha(email):
    Emailesquecido(email)
    return make_response(
        jsonify(
            mensagem='Email enviado',
            status = 200
        ),200
    )

def NovaSenha(idUsuario):
    Senhanova =  request.json
    teste = Senhanova.get('senha')
    atualizacaoSenha(idUsuario,teste)
    return make_response(
        jsonify(
            mensagem='Nova senha atualizada',
            status = 200
        ),200
        )
    

#GOOGLE

def login_google():
    redirect_uri = url_for('blueprint.callback_google', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

def callback_google():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.get('https://openidconnect.googleapis.com/v1/userinfo').json()
    session["google_token"] = token
    email = user_info['email']
    nome = user_info.get('name')
    imagem = user_info.get('picture', '')
    usuario = buscarUsuarioPorEmailService(email)
    if not usuario:
        senha='login_google'
        novo = Usuario(nome, email, senha, Imagem=imagem, Status=1)
        salvarUserService(novo)
        usuario = (email)
    session.modified = True
    session.permanent = True
    session['user_id'] = str(usuario['idUsuario'])
    session['user_name'] = usuario['NomeUsuario']
    session['user_email'] = usuario['EmailUsuario']
    time.sleep(10)
    return redirect(f'http://localhost:5173/login/callback?token={session["user_id"]}')

