#!/usr/bin/env bash
# Generate a self-signed TLS certificate covering all landing-site domains.
# Replace with Let's Encrypt via scripts/issue-letsencrypt-certs.sh after DNS is attached.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SSL_DIR="/etc/nginx/ssl/bookforge-landing"
DOMAINS=(
  lostamericanmemories.com
  www.lostamericanmemories.com
  stopwastingstuff.com
  www.stopwastingstuff.com
  forgottenamericansurvival.com
  www.forgottenamericansurvival.com
  carlyfeyoutube.com
  www.carlyfeyoutube.com
  americanfoodhistory.com
  www.americanfoodhistory.com
  forgottenamericanskills.com
  www.forgottenamericanskills.com
  forgottenamericanweapons.com
  www.forgottenamericanweapons.com
  britishnostalgiastore.com
  www.britishnostalgiastore.com
)

mkdir -p "$SSL_DIR"

CN="${DOMAINS[0]}"
OPENSSL_CNF="$(mktemp)"
{
  echo '[req]'
  echo 'default_bits = 2048'
  echo 'prompt = no'
  echo 'default_md = sha256'
  echo 'distinguished_name = dn'
  echo 'x509_extensions = v3_req'
  echo ''
  echo '[dn]'
  echo "CN = ${CN}"
  echo ''
  echo '[v3_req]'
  echo 'subjectAltName = @alt_names'
  echo ''
  echo '[alt_names]'
  i=1
  for domain in "${DOMAINS[@]}"; do
    echo "DNS.${i} = ${domain}"
    i=$((i + 1))
  done
} > "$OPENSSL_CNF"

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout "${SSL_DIR}/privkey.pem" \
  -out "${SSL_DIR}/fullchain.pem" \
  -config "$OPENSSL_CNF" \
  -extensions v3_req

rm -f "$OPENSSL_CNF"
chmod 600 "${SSL_DIR}/privkey.pem"

echo "Self-signed certificate written to ${SSL_DIR}"
echo "Run ${ROOT}/scripts/deploy-nginx-sites.sh to install nginx vhosts."
