#!/bin/bash
set -a

envsubst() {
  [ -n "${!1}" ] && sed -i "s|==${1}==|${!1}|g" assets/settings.json.template
}

# Replace the default configuration using the ENV
envsubst API_URL
envsubst OIDC_ISSUER
envsubst CLIENT_ID
cp assets/settings.json{.template,}

if [ "$1"  = 'nginx' ]; then
  exec nginx -g "daemon off;"
fi

exec "$@"
