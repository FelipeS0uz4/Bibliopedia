from flask import Flask
from main import blueprint
from flask_cors import CORS
from flask_session import Session
from Controller.userController import configure_google_auth

app = Flask(__name__)
sess = Session()
CORS(app)
app.config['SECRET_KEY'] =  'noragami9'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
configure_google_auth(app)
app.register_blueprint(blueprint)
app.run(host='127.0.0.1', port=5500, debug=True)


