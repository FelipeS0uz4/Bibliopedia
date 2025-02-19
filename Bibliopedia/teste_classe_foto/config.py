import mysql.connector

def conexao():
    return mysql.connector.connect(      
        host='localhost',
        user='root',
        password='noragami9',
        database='dados',
    )

