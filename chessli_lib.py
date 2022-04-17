""" Chessli libary for Chess.com/Lichess API interaction """
import json
import re
import requests


def get_lastgame_json(player):
    # ensure valid username
    if not re.compile('^[\w\-]{3,25}$').match(player):
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
    game = requests.get(gamesAPI).json()['games'][-1]

    # import game to Lichess and get URL
    importAPI = "https://lichess.org/api/import"
    gameURL = requests.post(importAPI, data={'pgn': game['pgn']}).json()['url']

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
