""" base Flask app for Chessli """
from flask import Flask, render_template, request
from chessli_lib import get_lastgame_json

# Create Flask's `app` object
app = Flask(
    __name__,
    template_folder='static'
)

@app.route('/')
def base():
    return render_template('index.html')

@app.route('/returnAJAX')
def returnAJAX():
    return get_lastgame_json(request.args['username'])
