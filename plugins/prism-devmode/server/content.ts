/**
 * Demo content for the Prism dev-mode workspace. Captured from the live dev
 * workspace so a fresh provision reproduces the current pages (text, tree,
 * titles, icons). Consumed by bootstrap.ts. Regenerate by re-capturing the
 * live docs (see project_files/_capture) when the demo pages change.
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

export const demoCollections: DemoCollection[] = [
  {
    name: "The Solar System (Collection A)",
    icon: "🌏",
    description:
      "## 🪐 Solar System Field Guide\n\nA compact, photo-rich tour of our cosmic neighborhood. A Prism theme-test sandbox — tables, images, emoji, callouts.\n",
    docs: [
      {
        title: "🪐 Solar System Field Guide",
        text: '# 🪐 Solar System Field Guide\n\nA quick, photo-rich tour of our cosmic neighborhood — eight planets, one star, and a lot of empty space. 🌌\n\n\n:::info\n**Scope:** the eight major planets. Pluto fans, we still love you. 💛\n\n:::\n\n ![](prism-media://CarkSaganVoyagers.JPG " =977x552")\n\n> *"Somewhere, something incredible is waiting to be known."* — Carl Sagan\n\n## How the Solar System moves\n\nThe Solar System orbits the center of the Milky Way at roughly **450,000 mph (720,000 km/h)**, while the planets revolve around the Sun — and the Sun and planets nudge one another through gravity along the way.\n\n ![](prism-media://solar_system_motion_1.png " =969x568")\n\n ![](prism-media://solar_system_motion_2.png " =949x559")\n\nBrowse the pages in this collection for planet profiles, records, and a side-by-side comparison. 👇\n\n## Resources\n\n- 📊 [Solar System slides (PowerPoint)](prism-media://solarsystem_CA_State_Northridge.ppt) — a classroom deck from CSU Northridge\n',
        children: [
          {
            title: "✨ Records & Fun Facts",
            text: "# ✨ Records & Fun Facts\n\n| 🏆 Record | Holder | Detail |\n|-----------|--------|--------|\n| Hottest planet | ♀️ Venus | 465 °C |\n| Tallest volcano | 🔴 Mars | Olympus Mons, \\~22 km |\n| Most moons | 🪐 Saturn | 146    |\n\n\n:::warning\nThe Sun is **99.86%** of the Solar System's total mass. ☀️ Everything else — every planet, moon, and asteroid — is the leftover 0.14%.\n\n:::",
          },
          {
            title: "🌐 Planets",
            text: "# 🌐 Planets\n\nFeatured profiles from across the system. 👇\n\n* 🌍 **Earth** — our pale blue dot\n* 🔴 **Mars** — the red planet\n* 🪐 **Saturn** — lord of the rings\n\n\n---\n\n**🪐 Planetary Manual** — Solar System ▸ Planets\n\n*Last updated: 2026-06-20* · Classification: **Client**\n\n> 🔒 **Proprietary & Confidential.** Prepared for authorized client use only. Not for redistribution.",
            children: [
              {
                title: "🪐 Saturn",
                text: "# 🪐 Saturn\n\n ![Saturn](https://commons.wikimedia.org/wiki/Special:FilePath/Saturn_during_Equinox.jpg)\n\nThe sixth planet from the Sun and the second-largest in the system — famous for its ring system of ice and rock. 💍 Saturn has at least **146 confirmed moons**; the largest, Titan, is bigger than Mercury.\n\n| Property | Value |\n|----------|-------|\n| 💍 Rings | 7 groups |\n| 🪨 Moons | 146   |\n| 🌡️ Mean temp | −138 °C |\n\n\n:::tip\nGreat facts at NASA → @[https://science.nasa.gov/saturn/facts/](mention://7cfd59d6-6f85-4abf-bf83-115255f4a806/url/90a0f252-cf6b-474d-9fa4-0af866a9d835)\n\n:::\n\n## Learn more\n\nProvided by [Astronomy For Kids](https://dustbunny.com/afk/planets/saturn/), in memory of the author Rick Morris.\n\n[saturn_astronomy_for_kids.pdf 105489](prism-media://saturn_astronomy_for_kids.pdf)\n\n\n---\n\n> 🪐 *Planetary Manual ▸ Saturn* — updated 2026-06-20 Proprietary & confidential · for clients only",
              },
              {
                title: "🔴 Mars",
                text: "# 🔴 Mars\n\n ![Mars](https://commons.wikimedia.org/wiki/Special:FilePath/OSIRIS_Mars_true_color.jpg)\n\nHome to **Olympus Mons**, the tallest volcano in the Solar System — nearly three times the height of Everest. 🌋\n\n| Property | Value |\n|----------|-------|\n| 🌡️ Mean temp | −63 °C |\n| 🌑 Moons | 2     |\n\n## Learn more\n\n[mars_astronomy_for_kids.pdf 92270](prism-media://mars_astronomy_for_kids.pdf)\n\n\n---\n\n| Manual | Section | Updated | Classification |\n|--------|---------|---------|----------------|\n| 🪐 Planetary | Planets ▸ Mars | 2026-06-20 | 🔒 Client-only |\n\n*Proprietary & confidential. Do not distribute.*",
              },
              {
                title: "🌍 Earth",
                text: "# 🌍 Earth\n\n ![Earth from Apollo 17](https://commons.wikimedia.org/wiki/Special:FilePath/The_Earth_seen_from_Apollo_17.jpg)\n\nOur pale blue dot — **71% ocean** and the only place known to host life. 🐳\n\n| Property | Value |\n|----------|-------|\n| 🌡️ Mean temp | 15 °C |\n| 🌕 Moons | 1     |\n\n## Learn more\n\n[earth_astronomy_for_kids.pdf 115819](prism-media://earth_astronomy_for_kids.pdf)\n\n\n---\n\n\n:::info\n**🌐 Planetary Manual ▸ Earth** · Last updated 2026-06-20 Proprietary & confidential — for clients only.\n\n:::",
              },
            ],
          },
          {
            title: "📊 Planet Comparison",
            text: '# 📊 Planet Comparison\n\nDistance is the average from the Sun in AU (1 AU = Earth\'s distance). 🌞\n\n| Planet | Type | Diameter (km) | Moons | Distance (AU) |\n|--------|------|--------------:|------:|--------------:|\n| ☿️ Mercury | Terrestrial | 4,879         | 0     | 0\\.39         |\n| ♀️ Venus | Terrestrial | 12,104        | 0     | 0\\.72         |\n| 🌍 Earth | Terrestrial | 12,742        | 1     | 1\\.00         |\n| 🔴 Mars | Terrestrial | 6,779         | 2     | 1\\.52         |\n| 🟠 Jupiter | Gas giant | 139,820       | 95    | 5\\.20         |\n| 🪐 Saturn | Gas giant | 116,460       | 146   | 9\\.58         |\n| 🔵 Uranus | Ice giant | 50,724        | 28    | 19\\.2         |\n| 🌀 Neptune | Ice giant | 49,244        | 16    | 30\\.1         |\n\n\n:::tip\nJupiter holds more than **twice the mass** of every other planet combined. 🤯\n\n:::\n\n## The three planet types\n\nEvery planet above belongs to one of three families:\n\n* **Terrestrial** — Mercury, Venus, Earth, Mars: small, rocky, dense.\n* **Gas giant** — Jupiter, Saturn: huge, hydrogen/helium, ringed.\n* **Ice giant** — Uranus, Neptune: icy mantles of water, ammonia, and methane.\n\n\n:::info\nℹ️ *Terrestrial* means "Earth-like" — from *terra*, the Latin for Earth.\n\n:::\n\n\n:::warning\n⚠️ Pluto is a **dwarf planet** — none of the three. 💛\n\n:::\n\n### 📐 The math\n\nKepler\'s third law ties orbital period $T$ to the semi-major axis $a$:\n\n$$\nT^2 \\propto a^3\n$$\n\n### ✅ Self-check\n\n- [ ] Name the four terrestrial planets\n- [ ] Name the two gas giants\n- [ ] Name the two ice giants\n\n> "We are a way for the cosmos to know itself." — Carl Sagan\n\n```python\ndef kind(diameter_km: int) -> str:\n    if diameter_km < 15000:\n        return "terrestrial"\n    return "giant"\n```',
          },
        ],
      },
    ],
  },
  {
    name: "Coffee (Collection B)",
    icon: "☕",
    description:
      "## ☕ World Coffee Atlas\n\nFrom cherry to cup — origins, brewing, tasting. A Prism theme-test sandbox full of tables, images, flags, and callouts. 🎨\n",
    docs: [
      {
        title: "☕ World Coffee Atlas",
        text: "# ☕ World Coffee Atlas\n\nFrom cherry to cup — a compact field guide to coffee. 🌱 → ☕\n\n\n:::info\n**Two species** dominate the world's cups: *arabica* (\\~60% — sweeter, more aromatic) and *robusta* (\\~40% — bolder, more bitter, more caffeine).\n\n:::\n\nUse the pages in this collection to explore where coffee grows, how it's roasted and brewed, and how to taste it like a pro. 👇\n\n* 🌍 **Origins** — how geography and altitude shape flavor\n* ☕ **Select a Roast** — from light to very dark\n* ⚗️ **Brew Methods** — ratios, grinds, and the brewing process\n* 🌟 **Tasting Notes** — a structured way to taste and score",
        children: [
          {
            title: "Select a Roast",
            text: "# Select a Roast\n\nRoast level shapes flavor, acidity, body, and aroma — and how much of the bean's origin character survives. ☕\n\n\n:::tip\n**New to roasts?** Start at **medium** — it's the most forgiving and the easiest baseline for comparing coffees.\n\n:::\n\n## Roast comparison\n\n| Roast | Appearance | Typical flavor | Acidity | Body |\n|-------|------------|----------------|---------|------|\n| **Light** | Light brown, dry | Floral, fruity, citrus, tea-like | High    | Light |\n| **Medium-light** | Medium brown, dry | Fruit, caramel, honey, nuts | Med–high | Light–medium |\n| **Medium** | Medium brown | Balanced, sweet, chocolate, nuts | Medium  | Medium |\n| **Medium-dark** | Dark brown, slight oil | Cocoa, spice, caramelized sugar | Low–medium | Medium–full |\n| **Dark** | Very dark, often oily | Smoke, char, dark chocolate | Low     | Full |\n| **Very dark** | Nearly black, oily | Burnt sugar, ash, bitter cocoa | Very low | Heavy |\n\n## The three you'll meet most\n\n### ☀️ Light\n\n* Bright acidity, floral or fruity notes, clear origin character\n* **Best for:** pour-over, filter, single-origin coffees\n\n> Light roast doesn't mean *weak* — strength is set by the coffee-to-water ratio, not the roast color.\n\n### ⚖️ Medium\n\n* Balanced acidity and sweetness; caramel, nut, and chocolate notes\n* **Best for:** drip, French press, AeroPress, everyday brewing\n\n### 🔥 Dark\n\n* Low acidity, heavy body, bold roast-driven flavor; smoke, cocoa, char\n* **Best for:** espresso, milk drinks, bold-flavor drinkers\n\n## Common roast names\n\n| Name | Approximate level |\n|------|-------------------|\n| Cinnamon | Very light        |\n| City | Light             |\n| City+ | Medium-light      |\n| Full City | Medium            |\n| Full City+ | Medium-dark       |\n| Vienna | Medium-dark       |\n| French | Dark              |\n| Italian | Very dark         |\n\n\n:::warning\nRoast names aren't standardized — one roaster's \"medium\" can be another's \"medium-dark.\" Trust the description, not the label.\n\n:::\n\n## Quick selection guide\n\n| If you like… | Try |\n|--------------|-----|\n| Fruity, floral, bright | Light |\n| Balanced, sweet, versatile | Medium |\n| Chocolate, rich, lower acidity | Medium-dark |\n| Smoky, bold, intense | Dark |\n| Best with milk | Medium-dark or dark |\n| Most origin character | Light or medium-light |\n\n## Roast evaluation checklist\n\n- [ ] Color and surface oil\n- [ ] Evenness of the roast\n- [ ] Acidity and sweetness\n- [ ] Roast flavor vs. bitterness\n- [ ] Body and balance\n- [ ] Best brew method for it",
          },
          {
            title: "🌟 Tasting Notes",
            text: '# 🌟 Tasting Notes\n\n ![A small cup of coffee](https://commons.wikimedia.org/wiki/Special:FilePath/A_small_cup_of_coffee.JPG)\n\nSpecialty coffee is graded on a 100-point scale; **80+** is "specialty." 📈 Taste a cup at several temperatures — hot, warm, and cool — and note the coffee, roast date, origin, process, and brew method.\n\n| Sample | Roast | Score |\n|--------|-------|------:|\n| 🇪🇹 Yirgacheffe | light | 88    |\n| 🇨🇴 Huila | medium | 84    |\n\n## The cupping ritual\n\n\n:::tip\n💡 **Slurp loudly.** It sprays the coffee across your whole palate and lifts the aroma.\n\n:::\n\n```mermaid\nflowchart LR\n  Smell --> Slurp --> Score --> Notes\n```\n\n- [ ] Smell the dry grounds (fragrance)\n- [ ] Add water, smell the crust (aroma)\n- [ ] Break the crust at 4 minutes\n- [ ] Slurp and score each attribute below\n\n## Quick tasting sequence\n\n| Step | Evaluate | Ask yourself |\n|------|----------|--------------|\n| 1    | Aroma    | Strong or faint? Fruity, floral, nutty, roasted, earthy? |\n| 2    | First sip | Bright or mellow? Sweet or bitter? Simple or complex? |\n| 3    | Acidity  | Crisp, juicy, tart, soft, or flat? |\n| 4    | Sweetness | Sugar, honey, caramel, fruit, chocolate? |\n| 5    | Flavor   | What familiar foods or aromas does it resemble? |\n| 6    | Body     | Light, full, creamy, silky, syrupy, or thin? |\n| 7    | Bitterness | Pleasant and supportive, or harsh? |\n| 8    | Finish   | Short or long? Clean, sweet, or drying? |\n| 9    | Balance  | Do the elements work together? Would you drink it again? |\n\n## Flavor reference\n\n| Fruit & floral | Sweet & nutty | Roast & other |\n|----------------|---------------|---------------|\n| Citrus, berry, apple, stone fruit, tropical, jasmine, rose, tea-like | Honey, caramel, brown sugar, vanilla, almond, hazelnut, milk & dark chocolate | Toasted bread, cocoa, cinnamon, smoke, char, cedar, herbs, earth |\n\n> Flavor notes are *comparisons*, not added ingredients. ☕\n\n## Scoring\n\nA simple cup score is the sum of the attribute scores:\n\n$$\n\\text{Total} = \\sum_{i} a_i\n$$\n\n| Attribute | Score (1–5) |\n|-----------|-------------|\n| Aroma     |             |\n| Flavor    |             |\n| Acidity   |             |\n| Sweetness |             |\n| Body      |             |\n| Finish    |             |\n| Overall   |             |\n\nA filled sample form:\n\n```text\nSample : Yirgacheffe\nAroma  : 8.50\nFlavor : 8.75\nAcidity: 8.50\nBody   : 7.75\n----------------\nTotal  : 88\n```\n\n## Final notes\n\n* **Dominant flavor:**\n* **Best quality:**\n* **Main weakness:**\n* **Changed as it cooled:**\n* **Would drink again:** Yes / No\n\n\n:::success\n🎉 That\'s the full ritual — aroma to finish.\n\n:::',
          },
          {
            title: "⚗️ Brew Methods",
            text: "# ⚗️ Brew Methods\n\nGood coffee is mostly ratio, grind, and time. Start from a baseline, then adjust to taste. ⚖️\n\n## Basic starting recipe\n\n| Item | Starting point |\n|------|----------------|\n| Coffee | 20 g           |\n| Water | 320 g          |\n| Ratio | 1:16           |\n| Temperature | 90–96 °C (195–205 °F) |\n| Grind | Match the brewer |\n| Brew time | Depends on method |\n\n## Methods at a glance\n\n| Method | Ratio | Grind | Time | Temp |\n|--------|-------|-------|-----:|-----:|\n| ☕ Pour-over | 1:16  | medium | 3–4 min | 96 °C |\n| ⚡ Espresso | 1:2   | fine  | 25–30 s | 93 °C |\n| 🧊 Cold brew | 1:8   | coarse | 12–18 h | cold |\n\n## The brewing process\n\nEvery method follows the same arc — dial it in with the feedback loop at the end.\n\n```mermaid\nflowchart TD\n  A[Choose fresh coffee] --> B[Measure coffee & water]\n  B --> C[Grind for the method]\n  C --> D[Heat water 90-96 C]\n  D --> E[Rinse filter, warm brewer]\n  E --> F[Add grounds]\n  F --> G[Pour evenly]\n  G --> H[Brew, then taste]\n  H --> I{Balanced?}\n  I -->|Yes| J[Record the recipe]\n  I -->|Too sour| K[Grind finer / brew longer]\n  I -->|Too bitter| L[Grind coarser / brew shorter]\n  K --> B\n  L --> B\n```\n\n\n:::tip\nChange **one variable at a time** — grind, ratio, or temperature — so you know what fixed the cup.\n\n:::",
          },
          {
            title: "🌍 Origins",
            text: "# 🌍 Origins\n\n ![Roasted coffee beans](https://commons.wikimedia.org/wiki/Special:FilePath/Roasted_coffee_beans.jpg)\n\nWhere coffee grows shapes how it tastes. Altitude is the big lever — higher and cooler means slower-ripening cherries and brighter acidity. 🏔️\n\n| Country | Region | Altitude (m) | Notes |\n|---------|--------|-------------:|-------|\n| 🇪🇹 Ethiopia | Yirgacheffe | 1,700–2,200  | floral, citrus |\n| 🇨🇴 Colombia | Huila  | 1,200–1,800  | caramel, balanced |\n| 🇰🇪 Kenya | Nyeri  | 1,600–2,000  | blackcurrant, bold |\n\n\n:::info\nThe same variety grown higher will usually taste brighter and more complex than one grown low and warm.\n\n:::",
          },
        ],
      },
    ],
  },
];
