from flask import Flask
from main import blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(blueprint)
app.run(host='127.0.0.1', port=5000, debug=True)