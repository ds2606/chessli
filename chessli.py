""" base Flask app for Chessli """
from flask import Flask, render_template
from chessli_lib import get_lastgame_json

# Create Flask's `app` object
app = Flask(
    __name__,
    template_folder='static'
)

@app.route('/')
def base():
    return render_template('index.html')

@app.route('/<username>')
def returnAJAX(username):
    return get_lastgame_json(username)
