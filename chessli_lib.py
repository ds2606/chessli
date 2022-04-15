import sys
import requests



import subprocess as sp
def get_lichess_url(player):
    archiveAPI = "https://api.chess.com/pub/player/" + player + "/games/archives"
    # gamesAPI=$(curl -s "$archiveAPI" | jq -r '.archives | .[-1]')
    # grep -q "null" <<< "$gamesAPI" && echo "user '$player' not found." && exit 1
    # importAPI="https://lichess.org/api/import"
    # PGN=$(curl -s "$gamesAPI" | jq '.games | .[-1] | {"pgn": .pgn}')
    # gameURL=$(curl -s -X POST -H 'Content-Type: application/json' -d "$PGN" $importAPI)
    # jq -r '. | .url' <<< "$gameURL" | xargs open


def get_lichess_url_bash(player):
    p = sp.run(["./chessli.bash", player], check=True, capture_output=True)
    return p.stdout.decode().strip()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: chessli <user> [n'th recent game (default: 1)]")
        sys.exit(0)

