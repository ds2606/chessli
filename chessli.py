""" base Flask app for Chessli """
from flask import Flask, render_template, request as req
import json
import logging
from logtail import LogtailHandler
import re
import requests

# Create Flask's `app` object
app = Flask(
    __name__,
    template_folder='static'
)

# Set up logging
logger = logging.getLogger('Chessli_logger')
logger.handlers = []
logger.setLevel(logging.INFO)
logger.addHandler(LogtailHandler(source_token="wGFyP3hRCXJEWwvtwqL5q5aQ"))
# logger.info('logtail instaqed')


@app.route('/')
def base():
    return render_template('index.html')


@app.route('/<username>')
def returnAJAX(username):
    logger.info('abcd')
    return get_lastgame_json(username)


def get_lastgame_json(player):
    logger.log(logging.INFO, 'abcx')
    # ensure valid username
    if not re.compile(r'^[\w\-]{3,25}$').match(player):
        return json.dumps({'error': 'invalid username'})

    # get JSON of most recent played game
    archivesAPI = 'https://api.chess.com/pub/player/' + player + '/games/archives'
    ua_header = {'user-agent': 'chessli/0.0.1, daniel.s.schreck@gmail.com'}
    try:
        gamesAPI = requests.get(archivesAPI, headers=ua_header).json()['archives'][-1]
    except KeyError:
        return json.dumps({'error': 'user ' + player + ' not found'})
    except IndexError:
        return json.dumps({'error': player + ' has played no games'})
    except json.JSONDecodeError:
        return json.dumps({'error': 'chess.com: too many requests'})
    game = requests.get(gamesAPI).json()['games'][-1]

    # import game to Lichess and get URL
    importAPI = "https://lichess.org/api/import"
    try:
        gameURL = requests.post(importAPI, data={'pgn': game['pgn']}).json()['url']
    except json.JSONDecodeError:
        return json.dumps({'error': 'lichess: too many requests'})

    # Log requested user (after successfully fetching and importing game)
    ip = ips[0] if (ips := req.headers.getlist("X-Forwarded-For")) else req.remote_addr
    # logger.info(player, extra={'ip': ip})
    logger.info(player)
    print(player, ip)

    # return payload to frontend
    payload = {
        'white': game['white']['username'],
        'black': game['black']['username'],
        'timecntl': game['time_control'],
        'timecls': game['time_class'],
        'link': gameURL
    }
    return json.dumps(payload)


# deprecated, just used for testing (gets lichess URL for chess.com user)
def get_lichess_url_bash(player):
    import subprocess as sp
    p = sp.run(["./chessli.bash", player], check=True, capture_output=True)
    return p.stdout.decode().strip()
