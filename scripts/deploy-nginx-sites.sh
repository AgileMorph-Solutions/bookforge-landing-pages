#!/usr/bin/env bash
# Install landing-site nginx vhosts on the host (does not modify the BookForge app config).
# WARNING: this installs docker/nginx/bookforge-landing.conf verbatim, including its
# certbot-managed ssl_certificate paths. If that file is out of sync with the live
# /etc/nginx/sites-enabled/bookforge-landing (e.g. certbot ran again since it was last
# copied back to git), running this will revert already-secured domains to the
# placeholder self-signed cert. Sync it first if unsure:
#   sudo cat /etc/nginx/sites-enabled/bookforge-landing > docker/nginx/bookforge-landing.conf
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
