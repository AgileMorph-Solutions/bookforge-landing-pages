#!/usr/bin/env bash
# Issue Let's Encrypt certificates for all landing domains (run after DNS A-records point here).
set -euo pipefail

EMAIL="${CERTBOT_EMAIL:-admin@bookforge.local}"

APEX_DOMAINS=(
  lostamericanmemories.com
  stopwastingstuff.com
  forgottenamericansurvival.com
  carlyfeyoutube.com
  americanfoodhistory.com
  forgottenamericanskills.com
  forgottenamericanweapons.com
  britishnostalgiastore.com
  onceuponabritishtime.com
  forgottenwaystomakemoney.com
)

for domain in "${APEX_DOMAINS[@]}"; do
  echo "=== certbot: ${domain} ==="
  certbot --nginx \
    -d "${domain}" \
    -d "www.${domain}" \
    --non-interactive \
    --agree-tos \
    -m "${EMAIL}" \
    --redirect \
    || echo "WARNING: certbot failed for ${domain} (DNS may not be ready yet)"
done

nginx -t
systemctl reload nginx

echo "Done. Certbot systemd timer handles renewal."
