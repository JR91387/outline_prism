#!/usr/bin/env python3
"""Capture the live Prism dev workspace back into the seed (content.ts).

Run this whenever the demo pages change in the running dev workspace and you want
those edits to ship in the seed (so a fresh provision reproduces them).

What it does:
  1. Pulls every collection, its ordered document tree, and each doc's markdown
     from the live workspace API (auth via the Claude dev token).
  2. Reads the attachments table to map attachment id -> original filename
     (the storage `key` is `uploads/<user>/<id>/<filename>`), then rewrites every
     `/api/attachments.redirect?id=<id>` reference to a stable
     `prism-media://<filename>` token. This is the critical step: without it a
     capture would bake in this-provision-only attachment ids and silently break
     reproduction. The matching source file must exist in
     `plugins/prism-devmode/server/media/`; bootstrap.ts re-uploads it and
     resolves the token on a fresh provision.
  3. Writes plugins/prism-devmode/server/content.ts.

Usage (from the repo root, with the dev stack running):
    python3 prism/seed/capture_content.py
Then: yarn prettier --write plugins/prism-devmode/server/content.ts && yarn tsc --noEmit

Assumes the default dev stack: containers prism-demo-app-1 / prism-demo-postgres-1,
app on http://100.86.220.56:3939. Override via env: PRISM_APP, PRISM_APP_CTR,
PRISM_PG_CTR.
"""
import json
import os
import re
import subprocess
import urllib.request

BASE = os.environ.get("PRISM_APP", "http://100.86.220.56:3939")
APP_CTR = os.environ.get("PRISM_APP_CTR", "prism-demo-app-1")
PG_CTR = os.environ.get("PRISM_PG_CTR", "prism-demo-postgres-1")
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONTENT_TS = os.path.join(REPO, "plugins", "prism-devmode", "server", "content.ts")

HEADER = """/**
 * Demo content for the Prism dev-mode workspace. Captured from the live dev
 * workspace by prism/seed/capture_content.py so a fresh provision reproduces the
 * current pages (text, tree, titles, icons). Attachment references are stored as
 * `prism-media://<filename>` tokens that bootstrap.ts resolves by re-uploading
 * the matching file from this plugin's media/ directory. Consumed by
 * bootstrap.ts. Re-run the capture script when the demo pages change.
 */

export type DemoDoc = {
  title: string;
  text: string;
  children?: DemoDoc[];
};

export type DemoCollection = {
  name: string;
  icon?: string;
  color?: string;
  description: string;
  docs: DemoDoc[];
};

export const demoCollections: DemoCollection[] = """


def docker_exec(container, *cmd):
    return subprocess.check_output(["docker", "exec", container, *cmd]).decode()


def token():
    return docker_exec(
        APP_CTR, "cat", "/var/lib/outline/data/prism-devmode/claude-token.txt"
    ).strip()


def api(ep, body, tok):
    req = urllib.request.Request(
        f"{BASE}/api/{ep}",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
        method="POST",
    )
    return json.load(urllib.request.urlopen(req, timeout=30))


def attachment_id_to_filename():
    """Map full attachment id -> basename(key) from the DB."""
    pgu = (
        docker_exec(PG_CTR, "printenv", "POSTGRES_USER").strip()
        if subprocess.run(
            ["docker", "exec", PG_CTR, "printenv", "POSTGRES_USER"],
            capture_output=True,
        ).returncode
        == 0
        else "outline"
    )
    pgd = "outline"
    out = subprocess.check_output(
        [
            "docker", "exec", PG_CTR, "psql", "-U", pgu, "-d", pgd, "-At", "-F", "|",
            "-c", "SELECT id, key FROM attachments;",
        ]
    ).decode()
    mapping = {}
    for line in out.splitlines():
        if "|" in line:
            aid, key = line.split("|", 1)
            mapping[aid] = key.rsplit("/", 1)[-1]
    return mapping


def tokenize(text, id_to_name):
    def repl(m):
        aid = m.group(1)
        name = id_to_name.get(aid)
        if not name:
            print(f"  WARN: attachment {aid[:8]} has no DB mapping; left as-is")
            return m.group(0)
        return f"prism-media://{name}"

    return re.sub(r"/api/attachments\.redirect\?id=([0-9a-f-]{36})", repl, text)


def main():
    tok = token()
    id_to_name = attachment_id_to_filename()
    print(f"attachments mapped: {len(id_to_name)}")
    docs = {d["id"]: d for d in api("documents.list", {"limit": 100}, tok)["data"]}
    cols = api("collections.list", {"limit": 100}, tok)["data"]

    def node(d):
        o = {"title": d["title"], "text": tokenize(docs[d["id"]].get("text", "") or "", id_to_name)}
        kids = [node(c) for c in d.get("children", [])]
        if kids:
            o["children"] = kids
        return o

    out = []
    for c in cols:
        tree = api("collections.documents", {"id": c["id"]}, tok)["data"]
        entry = {"name": c["name"]}
        if c.get("icon"):
            entry["icon"] = c["icon"]
        if c.get("color"):
            entry["color"] = c["color"]
        entry["description"] = c.get("description") or ""
        entry["docs"] = [node(d) for d in tree]
        out.append((c["name"], entry))

    # Solar System (Collection A) first, then Coffee (Collection B)
    out.sort(key=lambda x: ("Collection A" not in x[0], x[0]))
    data = [e for _, e in out]

    with open(CONTENT_TS, "w") as f:
        f.write(HEADER + json.dumps(data, indent=2, ensure_ascii=False) + ";\n")
    total_tokens = sum(
        json.dumps(d, ensure_ascii=False).count("prism-media://") for d in data
    )
    print(f"wrote {CONTENT_TS}: {len(data)} collections, {total_tokens} media tokens")
    print("now run: yarn prettier --write + yarn tsc --noEmit")


if __name__ == "__main__":
    main()
