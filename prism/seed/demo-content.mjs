#!/usr/bin/env node
/**
 * Prism demo content seeder.
 *
 * Populates a Prism / Outline workspace with two small, rich demo collections
 * (a Solar System field guide and a World Coffee atlas) — tables, images,
 * emoji, callouts, and nested pages. Idempotent: collections that already
 * exist (by name) with documents are left untouched.
 *
 * This lives in `prism/` so it is fully isolated from the upstream app/server
 * build (it is plain Node, not part of tsc/oxlint/vite) and survives upstream
 * merges cleanly. It talks only to the stable public API.
 *
 * Usage:
 *   OUTLINE_URL=http://127.0.0.1:3939 \
 *   OUTLINE_TOKEN=ol_api_xxxxx \
 *   node prism/seed/demo-content.mjs
 *   # or: node prism/seed/demo-content.mjs <url> <token>
 */

const BASE = (process.env.OUTLINE_URL || process.argv[2] || "").replace(/\/+$/, "");
const TOKEN = process.env.OUTLINE_TOKEN || process.argv[3] || "";
if (!BASE || !TOKEN) {
  console.error("Need OUTLINE_URL and OUTLINE_TOKEN (env or args).");
  process.exit(1);
}
const API = `${BASE}/api`;
const IMG = "https://commons.wikimedia.org/wiki/Special:FilePath";

async function api(method, payload) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) {
    throw new Error(`${method} failed: ${data.error || res.status} ${data.message || ""}`);
  }
  return data.data;
}

/** Find a collection by name, or create it (with overview + icon + color). */
async function ensureCollection({ name, description, color, icon }) {
  const existing = await api("collections.list", { limit: 100 });
  const found = existing.find((c) => c.name === name);
  if (found) {
    return { id: found.id, created: false };
  }
  const created = await api("collections.create", {
    name,
    description,
    color,
    icon,
    permission: "read_write",
  });
  return { id: created.id, created: true };
}

/** Recursively create a document tree under a collection. */
async function createTree(collectionId, node, parentDocumentId) {
  const doc = await api("documents.create", {
    title: node.title,
    text: node.text,
    collectionId,
    parentDocumentId,
    publish: true,
  });
  console.log(`    + ${node.title}`);
  for (const child of node.children || []) {
    await createTree(collectionId, child, doc.id);
  }
}

/** Seed a collection's docs only if it currently has none (idempotent). */
async function seedCollection(def) {
  const { id, created } = await ensureCollection(def);
  console.log(`  ${def.name} (${created ? "created" : "exists"})`);
  const docs = await api("documents.list", { collectionId: id, limit: 1 });
  if (docs.length > 0) {
    console.log("    already has documents — skipping");
    return;
  }
  for (const node of def.docs) {
    await createTree(id, node);
  }
}

const SOLAR = {
  name: "TestA",
  color: "#5856d6",
  icon: "planet",
  description:
    "## 🪐 Welcome to the Solar System Field Guide\n\n" +
    "A compact, photo-rich tour of our cosmic neighborhood — eight planets, one " +
    "star, and the records that make each world unique. 🌌\n\n" +
    ":::info\nThis collection is a **Prism demo / theme-test sandbox**: tables, " +
    "images, emoji, and callouts to see how each theme reskins the UI.\n:::\n\n" +
    "### 🚀 Start here\n" +
    "1. **📊 Planet Comparison** — all eight planets in one table\n" +
    "2. **🌐 Planets** — profiles of Earth, Mars, Jupiter & Saturn\n" +
    "3. **✨ Records & Fun Facts** — superlatives of the solar system\n",
  docs: [
    {
      title: "🪐 Solar System Field Guide",
      text:
        "# 🪐 Solar System Field Guide\n\n" +
        "A quick reference to our cosmic neighborhood — eight planets, one star, " +
        "and a lot of empty space. 🌌\n\n" +
        ":::info\n**Scope:** the eight major planets. Pluto fans, we still love you. 💛\n:::\n\n" +
        "> *“Somewhere, something incredible is waiting to be known.”* — Carl Sagan",
      children: [
        {
          title: "📊 Planet Comparison",
          text:
            "# 📊 Planet Comparison\n\n" +
            "Distance is the average from the Sun in astronomical units (1 AU = " +
            "Earth's distance). 🌞\n\n" +
            "| Planet | Type | Diameter (km) | Moons | Distance (AU) | Day length |\n" +
            "|---|---|--:|--:|--:|--:|\n" +
            "| ☿️ Mercury | Terrestrial | 4,879 | 0 | 0.39 | 1,408 h |\n" +
            "| ♀️ Venus | Terrestrial | 12,104 | 0 | 0.72 | 5,832 h |\n" +
            "| 🌍 Earth | Terrestrial | 12,742 | 1 | 1.00 | 24 h |\n" +
            "| 🔴 Mars | Terrestrial | 6,779 | 2 | 1.52 | 24.6 h |\n" +
            "| 🟠 Jupiter | Gas giant | 139,820 | 95 | 5.20 | 9.9 h |\n" +
            "| 🪐 Saturn | Gas giant | 116,460 | 146 | 9.58 | 10.7 h |\n" +
            "| 🔵 Uranus | Ice giant | 50,724 | 28 | 19.2 | 17.2 h |\n" +
            "| 🔷 Neptune | Ice giant | 49,244 | 16 | 30.1 | 16.1 h |\n\n" +
            ":::tip\nJupiter alone holds more than twice the mass of every other " +
            "planet **combined**. 🤯\n:::",
        },
        {
          title: "🌐 Planets",
          text:
            "# 🌐 Planets\n\nFeatured profiles. Pick a world below. 👇\n\n" +
            "- 🌍 Earth — the only known life-bearing world\n" +
            "- 🔴 Mars — the red, dusty frontier\n" +
            "- 🟠 Jupiter — king of the planets\n" +
            "- 🪐 Saturn — lord of the rings",
          children: [
            {
              title: "🌍 Earth",
              text:
                "# 🌍 Earth\n\n" +
                `![Earth from Apollo 17](${IMG}/The_Earth_seen_from_Apollo_17.jpg)\n\n` +
                "Our pale blue dot — 71% ocean and the only place known to host life. 🐳\n\n" +
                "## Fast facts\n\n| Property | Value |\n|---|---|\n" +
                "| 🌡️ Mean temp | 15 °C |\n| 🌕 Moons | 1 (Luna) |\n" +
                "| 💨 Atmosphere | 78% N₂, 21% O₂ |\n| 📅 Year | 365.25 days |\n\n" +
                ":::info\nEarth's Moon is drifting away at ~3.8 cm per year. 🌙\n:::",
            },
            {
              title: "🔴 Mars",
              text:
                "# 🔴 Mars\n\n" +
                `![Mars true color](${IMG}/OSIRIS_Mars_true_color.jpg)\n\n` +
                "The Red Planet — home to **Olympus Mons**, the tallest volcano in " +
                "the solar system (~22 km). 🌋\n\n" +
                "## Fast facts\n\n| Property | Value |\n|---|---|\n" +
                "| 🌡️ Mean temp | −63 °C |\n| 🌑 Moons | 2 (Phobos, Deimos) |\n" +
                "| 🤖 Active rovers | Curiosity, Perseverance |\n\n" +
                "> A year on Mars is 687 Earth days. 📅",
            },
            {
              title: "🟠 Jupiter",
              text:
                "# 🟠 Jupiter\n\n" +
                `![Jupiter](${IMG}/Jupiter_New_Horizons.jpg)\n\n` +
                "The largest planet — a gas giant with a **Great Red Spot** storm " +
                "wider than Earth. 🌀\n\n" +
                "## Fast facts\n\n| Property | Value |\n|---|---|\n" +
                "| 🪨 Moons | 95 known |\n| ⭐ Largest moon | Ganymede |\n" +
                "| 🕐 Day | 9.9 hours (fastest spin) |",
            },
            {
              title: "🪐 Saturn",
              text:
                "# 🪐 Saturn\n\n" +
                `![Saturn during equinox](${IMG}/Saturn_during_Equinox.jpg)\n\n` +
                "Famous for its spectacular ring system — made mostly of ice and rock. 💍\n\n" +
                "## Fast facts\n\n| Property | Value |\n|---|---|\n" +
                "| 💍 Rings | 7 main groups |\n| 🪨 Moons | 146 known |\n" +
                "| 🎈 Density | Less than water — it would float! |",
            },
          ],
        },
        {
          title: "✨ Records & Fun Facts",
          text:
            "# ✨ Records & Fun Facts\n\n" +
            "| 🏆 Record | Holder | Detail |\n|---|---|---|\n" +
            "| Hottest planet | ♀️ Venus | 465 °C (runaway greenhouse) |\n" +
            "| Tallest volcano | 🔴 Mars | Olympus Mons, ~22 km |\n" +
            "| Most moons | 🪐 Saturn | 146 and counting |\n" +
            "| Windiest | 🔷 Neptune | up to 2,100 km/h |\n\n" +
            ":::warning\nThe Sun accounts for **99.86%** of the solar system's " +
            "total mass. Everything else is a rounding error. ☀️\n:::\n\n" +
            "### Did you know? 🤔\n\n" +
            "1. A day on Venus is longer than its year. 🤯\n" +
            "2. Neptune has completed only **one** orbit since its 1846 discovery.\n" +
            "3. You could fit ~1.3 million Earths inside the Sun. 🌍➡️☀️",
        },
      ],
    },
  ],
};

const COFFEE = {
  name: "TestB",
  color: "#a0522d",
  icon: "beaker",
  description:
    "## ☕ Welcome to the World Coffee Atlas\n\n" +
    "From cherry to cup — a small field guide to where coffee grows, how to brew " +
    "it, and how the pros taste it. 🌱→☕\n\n" +
    ":::tip\nThis collection is a **Prism demo / theme-test sandbox** — full of " +
    "tables, images, flags, and callouts. Switch themes and watch it transform. 🎨\n:::\n\n" +
    "### 🧭 Start here\n" +
    "1. **🌍 Origins** — five classic growing countries\n" +
    "2. **⚗️ Brew Methods** — ratios, grind & timing cheat-sheet\n" +
    "3. **🗺️ Regions** — deep dives on Ethiopia & Colombia\n" +
    "4. **🌟 Tasting Notes** — a specialty scorecard\n",
  docs: [
    {
      title: "☕ World Coffee Atlas",
      text:
        "# ☕ World Coffee Atlas\n\n" +
        "From cherry to cup — a small field guide to coffee origins, brewing, and " +
        "tasting. 🌱→☕\n\n" +
        ":::info\n**Two species** dominate the world's cups: *Coffea arabica* " +
        "(~60%) and *Coffea canephora* / robusta (~40%).\n:::\n\n" +
        "> *“Coffee is a language in itself.”* — Jackie Chan",
      children: [
        {
          title: "🌍 Origins",
          text:
            "# 🌍 Coffee Origins\n\n" +
            `![Roasted coffee beans](${IMG}/Roasted_coffee_beans.jpg)\n\n` +
            "Altitude shapes flavor: higher and cooler usually means denser beans " +
            "and brighter acidity. 🏔️\n\n" +
            "| Country | Region | Altitude (m) | Typical notes |\n" +
            "|---|---|--:|---|\n" +
            "| 🇪🇹 Ethiopia | Yirgacheffe | 1,700–2,200 | floral, citrus, tea-like |\n" +
            "| 🇨🇴 Colombia | Huila | 1,200–1,800 | caramel, red apple, balanced |\n" +
            "| 🇧🇷 Brazil | Cerrado | 800–1,300 | chocolate, nutty, low acid |\n" +
            "| 🇰🇪 Kenya | Nyeri | 1,600–2,000 | blackcurrant, juicy, bold |\n" +
            "| 🇬🇹 Guatemala | Antigua | 1,500–1,700 | cocoa, spice, full body |\n\n" +
            ":::tip\nThe **bean belt** — coffee grows best roughly between the " +
            "Tropics of Cancer and Capricorn. 🌐\n:::",
        },
        {
          title: "⚗️ Brew Methods",
          text:
            "# ⚗️ Brew Methods\n\n" +
            "A cheat sheet of common methods. Ratios are coffee:water by weight. ⚖️\n\n" +
            "| Method | Ratio | Grind | Time | Water temp |\n" +
            "|---|---|---|--:|--:|\n" +
            "| ☕ Drip / pour-over | 1:16 | medium | 3–4 min | 96 °C |\n" +
            "| 🔘 French press | 1:15 | coarse | 4 min | 95 °C |\n" +
            "| ⚡ Espresso | 1:2 | fine | 25–30 s | 93 °C |\n" +
            "| 🧪 AeroPress | 1:14 | medium-fine | 1–2 min | 85 °C |\n" +
            "| 🧊 Cold brew | 1:8 | coarse | 12–18 h | cold |\n\n" +
            ":::warning\nWater is ~98% of your cup — if it tastes bad on its own, " +
            "it'll taste bad as coffee. 💧\n:::",
        },
        {
          title: "🗺️ Regions",
          text:
            "# 🗺️ Regions\n\nDeeper dives on two classic origins. 👇\n\n" +
            "- 🇪🇹 Ethiopia — coffee's birthplace\n" +
            "- 🇨🇴 Colombia — washed, balanced, dependable",
          children: [
            {
              title: "🇪🇹 Ethiopia",
              text:
                "# 🇪🇹 Ethiopia\n\n" +
                "The **birthplace of arabica**. Legend credits a goat herder named " +
                "Kaldi whose goats got lively after eating coffee cherries. 🐐\n\n" +
                "| Attribute | Detail |\n|---|---|\n" +
                "| 🌱 Process | washed & natural |\n| 🍑 Notes | floral, citrus, berry |\n" +
                "| 🗻 Altitude | 1,700–2,200 m |\n| 🏅 Famous region | Yirgacheffe |",
            },
            {
              title: "🇨🇴 Colombia",
              text:
                "# 🇨🇴 Colombia\n\n" +
                "Reliable, sweet, and balanced — the everyday hero of the coffee " +
                "world. Grown across the Andes by hundreds of thousands of small " +
                "farms. 🏔️\n\n" +
                "| Attribute | Detail |\n|---|---|\n" +
                "| 🌱 Process | mostly washed |\n| 🍎 Notes | caramel, red apple |\n" +
                "| 🗻 Altitude | 1,200–1,800 m |\n| 🏅 Famous region | Huila |",
            },
          ],
        },
        {
          title: "🌟 Tasting Notes",
          text:
            "# 🌟 Tasting Notes\n\n" +
            `![A small cup of coffee](${IMG}/A_small_cup_of_coffee.JPG)\n\n` +
            "A mini scorecard (specialty coffee is graded on a 100-point scale; " +
            "80+ is 'specialty'). 📈\n\n" +
            "| Sample | Roast | Body | Acidity | Score |\n" +
            "|---|---|---|---|--:|\n" +
            "| 🇪🇹 Yirgacheffe | light | light | high | 88 |\n" +
            "| 🇰🇪 Nyeri AA | light-med | medium | high | 87 |\n" +
            "| 🇨🇴 Huila | medium | medium | medium | 84 |\n" +
            "| 🇧🇷 Cerrado | med-dark | full | low | 81 |\n\n" +
            ":::info\n**Cupping** is the standardized way pros taste coffee — slurp " +
            "loudly to spray it across your palate. 😋\n:::",
        },
      ],
    },
  ],
};

async function main() {
  const me = await api("auth.info", {});
  console.log(`Seeding "${me.team.name}" as ${me.user.name}...`);
  for (const def of [SOLAR, COFFEE]) {
    await seedCollection(def);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
