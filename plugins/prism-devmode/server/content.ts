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
        text: '# 🪐 Solar System Field Guide\n\nA quick reference to our cosmic neighborhood — eight planets, one star, a lot of empty space. 🌌\n\n\n:::info\n**Scope:** the eight major planets. Pluto fans, we still love you. 💛\n\n:::\n\n\n ![](/api/attachments.redirect?id=d53f18c2-2ba2-4e7a-a5e9-0536aa9d89ca " =977x552")\n\n> *"Somewhere, something incredible is waiting to be known."* — Carl Sagan\n\n\n# How the Solar System Moves\n\nThe Solar System orbits the center of the Milky Way galaxy at speeds of about 450,000 miles per hour (720,000 kilometers per hour), while the planets also revolve around the Sun. Additionally, the Sun and planets experience slight movements due to gravitational interactions with each other.\n\n\n ![](/api/attachments.redirect?id=316c416d-1e6e-4a01-b9eb-a6d01e1d8ac3 " =969x568")\n\n ![](/api/attachments.redirect?id=9884ab55-63e4-4c79-8255-c7b527c5a1d3 " =949x559")',
        children: [
          {
            title: "✨ Records & Fun Facts",
            text: "# ✨ Records & Fun Facts\n\n| 🏆 Record | Holder | Detail |\n|-----------|--------|--------|\n| Hottest planet | ♀️ Venus | 465 °C |\n| Tallest volcano | 🔴 Mars | Olympus Mons, \\~22 km |\n| Most moons | 🪐 Saturn | 146    |\n\n\n:::warning\nThe Sun is **99.86%** of the solar system's total mass. ☀️\n\n:::\n\n\n\\\n\n\\",
          },
          {
            title: "🌐 Planets",
            text: "# 🌐 Planets\n\nFeatured profiles. 👇\n\n* 🌍 Earth\n* 🔴 Mars\n* 🪐 Saturn\n\n\n\\\n\n---\n\n**🪐 Planetary Manual** — Solar System ▸ Planets\n\n*Last updated: 2026-06-20* · Classification: **Client**\n\n> 🔒 **Proprietary & Confidential.** Prepared for authorized client use only. Not for redistribution.",
            children: [
              {
                title: "🪐 Saturn",
                text: "# 🪐 Saturn\n\n ![Saturn](https://commons.wikimedia.org/wiki/Special:FilePath/Saturn_during_Equinox.jpg)\n\nFamous for its ring system — mostly ice and rock. 💍 Saturn is the sixth planet from the Sun and the second-largest in the solar system, known for its stunning rings made mostly of ice particles. It has at least 292 moons, with Titan being the largest, even bigger than the planet Mercury.\n\n| Property | Value |\n|----------|-------|\n| 💍 Rings | 7 groups |\n| 🪨 Moons | 146   |\n\n\n:::tip\nGreat resources at NASA! @[https://science.nasa.gov/saturn/facts/](mention://7cfd59d6-6f85-4abf-bf83-115255f4a806/url/90a0f252-cf6b-474d-9fa4-0af866a9d835) \n\n:::\n\n\n***\n\n# Great Reading Resource!\n\n\n:::tip\n Provided by [Astronomy For Kids](https://dustbunny.com/afk/planets/saturn/) in memory of the author, Rick Morris\n\n:::\n\n\n[saturn_astronomy_for_kids.pdf 105489](/api/attachments.redirect?id=6e58b28e-2c02-4345-91f5-3c0263ffc9be)\n\n\n***\n\n\n\n---\n\n> 🪐 *Planetary Manual ▸ Saturn* — updated 2026-06-20 Proprietary & confidential · for clients only",
              },
              {
                title: "🔴 Mars",
                text: "# 🔴 Mars\n\n ![Mars](https://commons.wikimedia.org/wiki/Special:FilePath/OSIRIS_Mars_true_color.jpg)\n\nHome to **Olympus Mons**, the tallest volcano in the solar system. 🌋\n\n| Property | Value |\n|----------|-------|\n| 🌡️ Mean temp | −63 °C |\n| 🌑 Moons | 2     |\n\n\n***\n\n[mars_astronomy_for_kids.pdf 92270](/api/attachments.redirect?id=1d72cd84-b6af-42a6-8404-41c2bdf9af08)\n\n\n***\n\n\n\n---\n\n| Manual | Section | Updated | Classification |\n|--------|---------|---------|----------------|\n| 🪐 Planetary | Planets ▸ Mars | 2026-06-20 | 🔒 Client-only |\n\n*Proprietary & confidential. Do not distribute.*",
              },
              {
                title: "🌍 Earth",
                text: "# 🌍 Earth\n\n ![Earth from Apollo 17](https://commons.wikimedia.org/wiki/Special:FilePath/The_Earth_seen_from_Apollo_17.jpg)\n\nOur pale blue dot — 71% ocean, the only place known to host life. 🐳\n\n| Property | Value |\n|----------|-------|\n| 🌡️ Mean temp | 15 °C |\n| 🌕 Moons | 1     |\n\n\n***\n\n[earth_astronomy_for_kids.pdf 115819](/api/attachments.redirect?id=42dcf26b-10a5-43b8-89bf-7908291e9723)\n\n\n***\n\n\n\n---\n\n\n:::info\n**🌐 Planetary Manual ▸ Earth** · Last updated 2026-06-20 Proprietary & confidential — for clients only.\n\n:::",
              },
            ],
          },
          {
            title: "📊 Planet Comparison",
            text: '# 📊 Planet Comparison\n\nDistance is the average from the Sun in AU. 🌞\n\n| Planet | Type | Diameter (km) | Moons | Distance (AU) |\n|--------|------|--------------:|------:|--------------:|\n| ☿️ Mercury | Terrestrial | 4,879         | 0     | 0\\.39         |\n| ♀️ Venus | Terrestrial | 12,104        | 0     | 0\\.72         |\n| 🌍 Earth | Terrestrial | 12,742        | 1     | 1\\.00         |\n| 🔴 Mars | Terrestrial | 6,779         | 2     | 1\\.52         |\n| 🟠 Jupiter | Gas giant | 139,820       | 95    | 5\\.20         |\n| 🪐 Saturn | Gas giant | 116,460       | 146   | 9\\.58         |\n\n\n:::tip\nJupiter holds more than twice the mass of every other planet **combined**. 🤯\n\n:::\n\n## 🪐 The three planet types\n\nEvery planet above belongs to one of three families:\n\n* **Terrestrial** — Mercury, Venus, Earth, Mars: small, rocky, dense.\n* **Gas giant** — Jupiter, Saturn: huge, hydrogen/helium, ringed.\n* **Ice giant** — Uranus, Neptune: icy mantles of water, ammonia, methane.\n\n\n:::info\nℹ️ *Terrestrial* means "Earth-like" — from *terra*, the Latin for Earth.\n\n:::\n\n\n:::tip\n💡 Quick tell: if you can see rings, it\'s a giant.\n\n:::\n\n\n:::warning\n⚠️ Pluto is a **dwarf planet** — none of the three. 💛\n\n:::\n\n\n:::success\n✅ You can now classify all eight at a glance.\n\n:::\n\n### 📐 The math\n\nKepler\'s third law ties orbital period $T$ to semi-major axis $a$:\n\n$$\nT^2 \\propto a^3\n$$\n\n### ✅ Self-check\n\n- [ ] Four terrestrial planets\n- [ ] Two gas giants\n- [ ] Two ice giants\n\n> "We are a way for the cosmos to know itself." — Carl Sagan\n\n```python\ndef kind(diameter_km: int) -> str:\n    return "terrestrial" if diameter_km < 15000 else "giant"\n```\n\n\n---',
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
        text: "# ☕ World Coffee Atlas\n\nFrom cherry to cup — a small field guide. 🌱→☕\n\n\n:::info\n**Two species** dominate: *arabica* (\\~60%) and *robusta* (\\~40%).\n\n:::",
        children: [
          {
            title: "Select a Roast",
            text: '# Coffee Roast Levels\n\nRoast level affects flavor, acidity, body, aroma, and how much of the coffee\'s origin character remains noticeable.\n\n## Roast Comparison\n\n| Roast | Appearance | Typical Flavor | Acidity | Body |\n|-------|------------|----------------|---------|------|\n| **Light** | Light brown, dry surface | Floral, fruity, citrus, tea-like | High    | Light |\n| **Medium-Light** | Medium brown, dry | Fruit, caramel, honey, nuts | Med–high | Light–medium |\n| **Medium** | Medium brown | Balanced, sweet, chocolate, nuts | Medium  | Medium |\n| **Medium-Dark** | Dark brown, slight oil | Cocoa, spice, caramelized sugar | Low–medium | Medium–full |\n| **Dark** | Very dark, often oily | Smoke, char, dark chocolate, roast | Low     | Full |\n| **Very Dark** | Nearly black, oily | Burnt sugar, ash, smoke, bitter cocoa | Very low | Heavy |\n\n## Light Roast\n\n| Common Traits | Best For |\n|---------------|----------|\n| \\- Bright acidity<br>- Floral or fruity notes<br>- Clear origin character<br>- Little roast flavor | \\- Pour-over<br>- Filter coffee<br>- Single-origin coffees<br>- Drinkers who prefer complexity |\n\nLight roast does **not** necessarily mean weak. Strength depends more on the coffee-to-water ratio than roast color.\n\n## Medium Roast\n\n| Common Traits | Best For |\n|---------------|----------|\n| \\- Balanced acidity and sweetness<br>- Caramel, nut, and chocolate notes<br>- Moderate body<br>- Broad appeal | \\- Drip coffee<br>- French press<br>- AeroPress<br>- Everyday brewing |\n\nMedium roast is often the easiest starting point for comparing coffees.\n\n## Dark Roast\n\n| Common Traits | Best For |\n|---------------|----------|\n| \\- Low acidity<br>- Heavy body<br>- Strong roast flavor<br>- Smoke, cocoa, char, or spice | \\- Espresso<br>- Milk drinks<br>- French press<br>- Drinkers who prefer bold flavors |\n\nDark roasting reduces many origin-specific flavors and emphasizes the roasting process itself.\n\n## Common Roast Names\n\n| Name | Approximate Level |\n|------|-------------------|\n| Cinnamon | Very light        |\n| City | Light             |\n| City+ | Medium-light      |\n| Full City | Medium            |\n| Full City+ | Medium-dark       |\n| Vienna | Medium-dark       |\n| French | Dark              |\n| Italian | Very dark         |\n\nRoast names are not standardized. One roaster\'s "medium" may resemble another roaster\'s "medium-dark."\n\n## Quick Selection Guide\n\n| Preference | Try |\n|------------|-----|\n| Fruity, floral, bright | Light |\n| Balanced, sweet, versatile | Medium |\n| Chocolate, rich, lower acidity | Medium-dark |\n| Smoky, bold, intense | Dark |\n| Best with milk | Medium-dark or dark |\n| Most origin character | Light or medium-light |\n\n## Roast Evaluation Checklist\n\n| Appearance | Flavor | Overall |\n|------------|--------|---------|\n| ☐ Color<br>☐ Surface oil<br>☐ Evenness | ☐ Acidity<br>☐ Sweetness<br>☐ Roast flavor<br>☐ Bitterness | ☐ Body<br>☐ Balance<br>☐ Best brew method<br>☐ Personal preference |',
          },
          {
            title: "🌟 Tasting Notes",
            text: "# 🌟 Tasting Notes\n\n ![A small cup of coffee](https://commons.wikimedia.org/wiki/Special:FilePath/A_small_cup_of_coffee.JPG)\n\nSpecialty coffee is graded on a 100-point scale; 80+ is 'specialty'. 📈\n\n| Sample | Roast | Score |\n|--------|-------|------:|\n| 🇪🇹 Yirgacheffe | light | 88    |\n| 🇨🇴 Huila | medium | 84    |\n\n\n# Coffee Tasting Guide\n\nTaste coffee at several temperatures—hot, warm, and cool. Record the coffee, roast date, origin, process, and brew method when known.\n\n## Quick Tasting Sequence\n\n| Step | Evaluate | Questions |\n|------|----------|-----------|\n| 1    | Aroma    | Strong or faint? Fruity, floral, nutty, roasted, earthy? |\n| 2    | First sip | Bright or mellow? Sweet or bitter? Simple or complex? |\n| 3    | Acidity  | Crisp, juicy, tart, sharp, soft, or flat? |\n| 4    | Sweetness | Sugar, honey, caramel, fruit, chocolate? |\n| 5    | Flavor   | What familiar foods or aromas does it resemble? |\n| 6    | Body     | Light, full, creamy, silky, syrupy, thin, or dry? |\n| 7    | Bitterness | Pleasant and supportive, or harsh and dominant? |\n| 8    | Finish   | Short or long? Clean, sweet, bitter, or drying? |\n| 9    | Balance  | Do the elements work together? Would you drink it again? |\n\n## Flavor Reference\n\n| Fruit & Floral | Sweet & Nutty | Roast & Other |\n|----------------|---------------|---------------|\n| \\- Citrus<br>- Berry<br>- Apple<br>- Stone fruit<br>- Tropical fruit<br>- Jasmine<br>- Rose<br>- Tea-like | \\- Honey<br>- Caramel<br>- Brown sugar<br>- Vanilla<br>- Almond<br>- Hazelnut<br>- Milk chocolate<br>- Dark chocolate | \\- Toasted bread<br>- Cocoa<br>- Cinnamon<br>- Smoke<br>- Char<br>- Cedar<br>- Herbs<br>- Earth |\n\nFlavor notes are comparisons, not added ingredients.\n\n## Evaluation Checklist\n\n| Aroma | Flavor | Structure |\n|-------|--------|-----------|\n| ☐ Intensity<br>☐ Cleanliness<br>☐ Dry-ground aroma<br>☐ Brewed aroma | ☐ Sweetness<br>☐ Acidity<br>☐ Bitterness<br>☐ Flavor notes | ☐ Body<br>☐ Mouthfeel<br>☐ Finish<br>☐ Balance |\n\n## Simple Rating\n\n| Category | Score |\n|----------|-------|\n| Aroma    | 1–5   |\n| Flavor   | 1–5   |\n| Acidity  | 1–5   |\n| Sweetness | 1–5   |\n| Body     | 1–5   |\n| Finish   | 1–5   |\n| Overall  | 1–5   |\n\n### Final Notes\n\n* **Dominant flavor:**\n* **Best quality:**\n* **Main weakness:**\n* **Changes as it cooled:**\n* **Would drink again:** Yes / No\n\n\n## 🧪 How to cup like a pro\n\nA second tour through Prism's content blocks. ☕\n\n\n:::tip\n💡 **Slurp loudly** — it sprays the coffee across your whole palate.\n\n:::\n\n### Cupping checklist\n\n- [ ] Smell the dry grounds (fragrance)\n- [ ] Add water, smell the crust (aroma)\n- [ ] Break the crust at 4 minutes\n- [ ] Slurp and score each attribute\n\n### ☕ Bean-to-score flow\n\n```mermaid\nflowchart LR\n  Beans --> Grind --> Brew --> Taste --> Score\n```\n\n### 📐 Scoring\n\nThe cup score is the sum of the attribute scores:\n\n$$\n\\text{Total} = \\sum_{i} a_i\n$$\n\n### A sample cupping form\n\n```text\nSample : Yirgacheffe\nAroma  : 8.50\nFlavor : 8.75\nAcidity: 8.50\nBody   : 7.75\n----------------\nTotal  : 88\n```\n\n> \"Coffee is a language in itself.\" — Jackie Chan\n\n\n:::success\n🎉 That's the full ritual — and most of Prism's insert types.\n\n:::",
          },
          {
            title: "⚗️ Brew Methods",
            text: "# ⚗️ Brew Methods\n\n## Basic Starting Recipe\n\n| Item | Starting Point |\n|------|----------------|\n| Coffee | 20 g           |\n| Water | 320 g          |\n| Ratio | 1:16           |\n| Temperature | 195–205°F      |\n| Brew time | Depends on method |\n| Grind | Match the brewer |\n\nRatios are coffee:water by weight. ⚖️\n\n| Method | Ratio | Grind | Time | Temp |\n|--------|-------|-------|-----:|-----:|\n| ☕ Pour-over | 1:16  | medium | 3–4 min | 96 °C |\n| ⚡ Espresso | 1:2   | fine  | 25–30 s | 93 °C |\n| 🧊 Cold brew | 1:8   | coarse | 12–18 h | cold |\n\n\n```mermaid\nflowchartTD A[Choose fresh coffee] --> B[Measure coffee and water] B --> C[Grind for brew method] C --> D[Heat water<br/>90–96°C / 195–205°F] D --> E[Rinse filter and warm brewer] E --> F[Add ground coffee] F --> G[Pour water evenly] G --> H[Allow coffee to brew] H --> I[Serve and taste] I --> J{Balanced?} J -- Yes --> K[Record the recipe] J -- Too sour --> L[Grind finer or brew longer] J -- Too bitter --> M[Grind coarser or brew shorter] L --> B M --> B\n```\n\n\n## 🔁 The brew process\n\nEvery method follows the same arc — only the timings change.\n\n```mermaid\nflowchart TD\n  A([☕ Select beans]) --> B[⚖️ Weigh & grind]\n  B --> C{Method?}\n  C -->|Pour-over| D[💧 Bloom 30s → pour in stages]\n  C -->|Espresso| E[🔩 Tamp → extract 25–30s]\n  C -->|Cold brew| F[🧊 Steep 12–18h → filter]\n  D --> Z([🍵 Enjoy])\n  E --> Z\n  F --> Z\n```",
          },
          {
            title: "🌍 Origins",
            text: "# 🌍 Coffee Origins\n\n ![Roasted coffee beans](https://commons.wikimedia.org/wiki/Special:FilePath/Roasted_coffee_beans.jpg)\n\nAltitude shapes flavor — higher and cooler means brighter acidity. 🏔️\n\n| Country | Region | Altitude (m) | Notes |\n|---------|--------|-------------:|-------|\n| 🇪🇹 Ethiopia | Yirgacheffe | 1,700–2,200  | floral, citrus |\n| 🇨🇴 Colombia | Huila  | 1,200–1,800  | caramel, balanced |\n| 🇰🇪 Kenya | Nyeri  | 1,600–2,000  | blackcurrant, bold |",
          },
        ],
      },
    ],
  },
];
