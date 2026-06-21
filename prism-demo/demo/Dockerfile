# Prism demo image — builds the fork from source so a forker gets Prism's themes.
# Postgres and Redis are separate compose services (see docker-compose.yml).
# LOCAL EVALUATION ONLY. Fully isolated under prism/ — no upstream files changed.
FROM node:24.16.0

WORKDIR /opt/outline
ENV NODE_ENV=production NODE_OPTIONS="--max-old-space-size=8192"

# cmake is needed by some native deps; wget for the healthcheck.
RUN apt-get update && apt-get install -y --no-install-recommends cmake wget \
    && rm -rf /var/lib/apt/lists/*

# Dependencies (cached layer) — mirrors the upstream Dockerfile.base steps.
COPY package.json yarn.lock .yarnrc.yml ./
COPY patches ./patches
RUN corepack enable && \
    yarn install --immutable --network-timeout 1000000 && \
    yarn cache clean

# App source + production build.
COPY . .
RUN yarn build

# Minimal entrypoint: run migrations (ssl-disabled CLI env for the bundled,
# non-TLS Postgres) then start the production server. Postgres readiness is
# handled by the compose healthcheck (depends_on: service_healthy).
COPY <<'EOS' /entrypoint.sh
#!/usr/bin/env bash
set -euo pipefail
cd /opt/outline
echo ">> running migrations"
yarn db:migrate --env production-ssl-disabled
echo ">> starting Prism (production) on :${PORT:-3000}"
exec node ./build/server/index.js
EOS
RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s \
  CMD wget -qO- "http://localhost:${PORT:-3000}/_health" | grep -q OK || exit 1

EXPOSE 3000
CMD ["/entrypoint.sh"]
