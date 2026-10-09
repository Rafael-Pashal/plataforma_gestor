#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 3 || ! $1 =~ ^[[:alnum:].-]+$ || ! $2 =~ ^[0-9]+$ || ! $3 =~ ^[0-9]+$ ]]; then
  echo "Usage: bash scripts/smoke.sh <host> <web-port> <api-port>" >&2
  exit 2
fi

host=$1
web_port=$2
api_port=$3

curl --fail --silent --show-error --retry 20 --retry-delay 2 --retry-connrefused \
  "http://${host}:${api_port}/health" >/dev/null
curl --fail --silent --show-error --retry 20 --retry-delay 2 --retry-connrefused \
  "http://${host}:${web_port}/" >/dev/null

printf 'Smoke checks passed for %s web:%s and api:%s\n' "$host" "$web_port" "$api_port"
