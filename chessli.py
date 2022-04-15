from flask import Flask, render_template
from chessli_lib import get_lichess_url

# Create Flask's `app` object
app = Flask(
    __name__,
    template_folder='static'
)

@app.route('/')
def base():
    return render_template('index.html')

@app.route('/geturl')
def chessli():
    return get_lichess_url('rasusu')

@app.route('/fade')
def fade():
    return render_template('fade.html')
