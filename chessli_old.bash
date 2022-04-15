#!/usr/bin/env bash
# ChessLi. Chess.com games => Lichess analysis.
# Import your most recent chess.com game to lichess.
# TODO: get most recent game from 'List of Monthly Archives API'
# TODO: if player is ID'd but no games in calendar month, search backwa

[[ $# -eq 0 ]] && echo "Usage: chessli <user> [n'th recent game (default: 1)]" && exit
player=$(echo "$1" | tr '[:upper:]' '[:lower:]')  # username must be lowercase
archiveAPI="https://api.chess.com/pub/player/$player/games/archives"
gamesAPI=$(curl -s "$archiveAPI" | jq -r '.archives | .[-1]')
grep -q "null" <<< "$gamesAPI" && echo "user '$player' not found." && exit 1
importAPI="https://lichess.org/api/import"
PGN=$(curl -s "$gamesAPI" | jq '.games | .[-1] | {"pgn": .pgn}')
gameURL=$(curl -s -X POST -H 'Content-Type: application/json' -d "$PGN" $importAPI)
jq -r '. | .url' <<< "$gameURL" | xargs open
