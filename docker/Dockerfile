# Shared multi-stage Dockerfile for Bookforge landing sites.
# Build from repo root: docker compose -f docker-compose.prod.yml build

FROM node:20-alpine AS deps
WORKDIR /app
ARG SITE_DIR
COPY ${SITE_DIR}/package.json ${SITE_DIR}/package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ARG SITE_DIR
COPY --from=deps /app/node_modules ./node_modules
COPY ${SITE_DIR}/ .
RUN mkdir -p assets
# NEXT_PUBLIC_* vars are inlined at build time. Merge shared Stripe keys with site .env.
COPY .env.stripe ${SITE_DIR}/.env ./
RUN cat .env.stripe .env > .env.merged && mv .env.merged .env && rm .env.stripe
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/assets ./assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
