import mysql.connector

def conexao():
    return mysql.connector.connect(      
        host='localhost',
        user='root',
        password='noragami9',
        database='dados',
    )

GOOGLE_CLIENT_ID  ="803942681362-nbfdgsqlec0b6aba1eghqjo9fc2geqpt.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET ="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"
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"