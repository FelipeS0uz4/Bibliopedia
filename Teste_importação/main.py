from flask import Blueprint
from livro import *


blueprint = Blueprint('blueprint',__name__)
blueprint.route('/livro', methods=['GET'])(TodosLivros)
blueprint.route('/livro', methods=['POST'])(SalveLivro)
