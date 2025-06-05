import mysql.connector
from authlib.integrations.flask_client import OAuth

def conexao():
    return mysql.connector.connect(      
        host='localhost',
        user='root',
        password='Side1912*',
        database='dados',
    )


GOOGLE_CLIENT_ID  ="803942681362-nbfdgsqlec0b6aba1eghqjo9fc2geqpt.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET ="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"
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"


oauth = OAuth()

def configure_google_auth(app):
    oauth.init_app(app)
    oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    api_base_url='https://www.googleapis.com/',
    client_kwargs={
        'scope': 'openid email profile https://www.googleapis.com/auth/books'
    },
    authorize_params={
        'prompt': 'consent'
    }
)

