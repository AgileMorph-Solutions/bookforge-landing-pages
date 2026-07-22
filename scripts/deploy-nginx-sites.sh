#!/usr/bin/env bash
# Install landing-site nginx vhosts on the host (does not modify the BookForge app config).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="${ROOT}/docker/nginx/bookforge-landing.conf"
TARGET="/etc/nginx/sites-available/bookforge-landing"
ENABLED="/etc/nginx/sites-enabled/bookforge-landing"

if [[ ! -f "$SOURCE" ]]; then
  echo "Missing nginx config: $SOURCE" >&2
  exit 1
fi

if [[ ! -f /etc/nginx/ssl/bookforge-landing/fullchain.pem ]]; then
  echo "TLS cert not found. Run ${ROOT}/scripts/generate-self-signed-certs.sh first." >&2
  exit 1
fi

install -m 644 "$SOURCE" "$TARGET"
ln -sfn "$TARGET" "$ENABLED"

nginx -t
systemctl reload nginx

echo "Installed ${TARGET} and reloaded nginx."
