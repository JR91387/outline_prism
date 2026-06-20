# Prism demo bundle

Spin up Prism locally — the fork built from source (so you get the themes), with
Postgres + Redis — and load two demo collections to look at. **Local evaluation
only.** Everything here is isolated under `prism/`; no upstream files are touched.

## Prerequisites
- Docker + Docker Compose
- ~3 GB free disk, ~2 GB free RAM
- Node 24 on the host (only to run the content seeder in step 4)

## 1. Configure
```bash
cd prism/demo
cp .env.example .env
openssl rand -hex 32   # paste into SECRET_KEY in .env
openssl rand -hex 32   # paste into UTILS_SECRET in .env
```
Adjust `URL` / `HOST_PORT` in `.env` if `3939` is taken (keep them consistent).

## 2. Start it
```bash
docker compose up --build      # first build ~5–10 min (yarn install + build)
```
Wait until the `app` service is healthy, then open **http://localhost:3939**.

## 3. Create your workspace (this also logs you in)
On first visit you'll see **Create workspace**. Fill in a team name, your name,
and any email (e.g. `admin@prism.local`). One click provisions the workspace,
makes you the admin, **and signs your browser in** — no email/SMTP needed.

## 4. Load the demo content
Create an API token in the UI: **Settings → API Tokens → New token** (copy the
`ol_api_…` value), then:
```bash
OUTLINE_URL=http://localhost:3939 OUTLINE_TOKEN=ol_api_xxx \
  node ../seed/demo-content.mjs
```
Refresh — you'll have **Solar System Field Guide** and **World Coffee Atlas**
collections (tables, images, emoji, callouts). The seeder is idempotent; re-runs
skip collections that already have content.

## 5. Try the themes
**Settings → Details → Theme → Advanced** → pick a theme → **Save**. It applies
workspace-wide. (That's the whole point of Prism.)

## Notes & troubleshooting
- **"Installation already has existing teams"** — you already created a workspace;
  skip step 3, just do the token + seeder.
- **Fresh start** — `docker compose down -v` wipes the volumes, then start again.
- **Logging in again after logout** — the demo runs with email disabled, so the
  one-time Create-workspace session is your way in. To enable repeat email
  sign-in, set the `SMTP_*` vars in `.env` (any real SMTP, or a local catcher
  like mailpit) and restart.
- **Plain HTTP** — `FORCE_HTTPS=false` is set for local use; put a TLS reverse
  proxy in front for anything beyond your machine.
