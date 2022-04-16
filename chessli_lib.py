""" Chessli libary for Chess.com/Lichess API interaction """
import json
import requests


def get_lastgame_json(player):
    archiveAPI = "https://api.chess.com/pub/player/" + player + "/games/archives"
    try:
        recentGamesAPI = requests.get(archiveAPI).json()['archives'][-1]
    except KeyError:
        # TODO signal error if user not found
        return 'no no no bad bad bad'
    game = requests.get(recentGamesAPI).json()['games'][-1]

    importAPI = "https://lichess.org/api/import"
    gameURL = requests.post(importAPI, data={'pgn': game['pgn']}).json()['url']

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
