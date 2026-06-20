/**
 * Demo content for the Prism dev-mode workspace — two small, rich collections
 * (tables, images, emoji, callouts, nested pages). Consolidated here so all
 * dev-mode config lives in this plugin. Consumed by bootstrap.ts.
 */
const IMG = "https://commons.wikimedia.org/wiki/Special:FilePath";

export type DemoDoc = {
  title: string;
  text: string;
  children?: DemoDoc[];
};

export type DemoCollection = {
  name: string;
  icon: string;
  color: string;
  description: string;
  docs: DemoDoc[];
};

export const demoCollections: DemoCollection[] = [
  {
    name: "TestA",
    icon: "planet",
    color: "#5856d6",
    description:
      "## 🪐 Solar System Field Guide\n\nA compact, photo-rich tour of our cosmic " +
      "neighborhood. A Prism theme-test sandbox — tables, images, emoji, callouts.\n",
    docs: [
      {
        title: "🪐 Solar System Field Guide",
        text:
          "# 🪐 Solar System Field Guide\n\nA quick reference to our cosmic " +
          "neighborhood — eight planets, one star, a lot of empty space. 🌌\n\n" +
          ":::info\n**Scope:** the eight major planets. Pluto fans, we still love you. 💛\n:::\n\n" +
          "> *“Somewhere, something incredible is waiting to be known.”* — Carl Sagan",
        children: [
          {
            title: "📊 Planet Comparison",
            text:
              "# 📊 Planet Comparison\n\nDistance is the average from the Sun in AU. 🌞\n\n" +
              "| Planet | Type | Diameter (km) | Moons | Distance (AU) |\n" +
              "|---|---|--:|--:|--:|\n" +
              "| ☿️ Mercury | Terrestrial | 4,879 | 0 | 0.39 |\n" +
              "| ♀️ Venus | Terrestrial | 12,104 | 0 | 0.72 |\n" +
              "| 🌍 Earth | Terrestrial | 12,742 | 1 | 1.00 |\n" +
              "| 🔴 Mars | Terrestrial | 6,779 | 2 | 1.52 |\n" +
              "| 🟠 Jupiter | Gas giant | 139,820 | 95 | 5.20 |\n" +
              "| 🪐 Saturn | Gas giant | 116,460 | 146 | 9.58 |\n\n" +
              ":::tip\nJupiter holds more than twice the mass of every other planet **combined**. 🤯\n:::",
          },
          {
            title: "🌐 Planets",
            text: "# 🌐 Planets\n\nFeatured profiles. 👇\n\n- 🌍 Earth\n- 🔴 Mars\n- 🪐 Saturn",
            children: [
              {
                title: "🌍 Earth",
                text:
                  "# 🌍 Earth\n\n" +
                  `![Earth from Apollo 17](${IMG}/The_Earth_seen_from_Apollo_17.jpg)\n\n` +
                  "Our pale blue dot — 71% ocean, the only place known to host life. 🐳\n\n" +
                  "| Property | Value |\n|---|---|\n| 🌡️ Mean temp | 15 °C |\n| 🌕 Moons | 1 |",
              },
              {
                title: "🔴 Mars",
                text:
                  "# 🔴 Mars\n\n" +
                  `![Mars](${IMG}/OSIRIS_Mars_true_color.jpg)\n\n` +
                  "Home to **Olympus Mons**, the tallest volcano in the solar system. 🌋\n\n" +
                  "| Property | Value |\n|---|---|\n| 🌡️ Mean temp | −63 °C |\n| 🌑 Moons | 2 |",
              },
              {
                title: "🪐 Saturn",
                text:
                  "# 🪐 Saturn\n\n" +
                  `![Saturn](${IMG}/Saturn_during_Equinox.jpg)\n\n` +
                  "Famous for its ring system — mostly ice and rock. 💍\n\n" +
                  "| Property | Value |\n|---|---|\n| 💍 Rings | 7 groups |\n| 🪨 Moons | 146 |",
              },
            ],
          },
          {
            title: "✨ Records & Fun Facts",
            text:
              "# ✨ Records & Fun Facts\n\n" +
              "| 🏆 Record | Holder | Detail |\n|---|---|---|\n" +
              "| Hottest planet | ♀️ Venus | 465 °C |\n" +
              "| Tallest volcano | 🔴 Mars | Olympus Mons, ~22 km |\n" +
              "| Most moons | 🪐 Saturn | 146 |\n\n" +
              ":::warning\nThe Sun is **99.86%** of the solar system's total mass. ☀️\n:::",
          },
        ],
      },
    ],
  },
  {
    name: "TestB",
    icon: "beaker",
    color: "#a0522d",
    description:
      "## ☕ World Coffee Atlas\n\nFrom cherry to cup — origins, brewing, tasting. A " +
      "Prism theme-test sandbox full of tables, images, flags, and callouts. 🎨\n",
    docs: [
      {
        title: "☕ World Coffee Atlas",
        text:
          "# ☕ World Coffee Atlas\n\nFrom cherry to cup — a small field guide. 🌱→☕\n\n" +
          ":::info\n**Two species** dominate: *arabica* (~60%) and *robusta* (~40%).\n:::",
        children: [
          {
            title: "🌍 Origins",
            text:
              "# 🌍 Coffee Origins\n\n" +
              `![Roasted coffee beans](${IMG}/Roasted_coffee_beans.jpg)\n\n` +
              "Altitude shapes flavor — higher and cooler means brighter acidity. 🏔️\n\n" +
              "| Country | Region | Altitude (m) | Notes |\n|---|---|--:|---|\n" +
              "| 🇪🇹 Ethiopia | Yirgacheffe | 1,700–2,200 | floral, citrus |\n" +
              "| 🇨🇴 Colombia | Huila | 1,200–1,800 | caramel, balanced |\n" +
              "| 🇰🇪 Kenya | Nyeri | 1,600–2,000 | blackcurrant, bold |",
          },
          {
            title: "⚗️ Brew Methods",
            text:
              "# ⚗️ Brew Methods\n\nRatios are coffee:water by weight. ⚖️\n\n" +
              "| Method | Ratio | Grind | Time | Temp |\n|---|---|---|--:|--:|\n" +
              "| ☕ Pour-over | 1:16 | medium | 3–4 min | 96 °C |\n" +
              "| ⚡ Espresso | 1:2 | fine | 25–30 s | 93 °C |\n" +
              "| 🧊 Cold brew | 1:8 | coarse | 12–18 h | cold |",
          },
          {
            title: "🌟 Tasting Notes",
            text:
              "# 🌟 Tasting Notes\n\n" +
              `![A small cup of coffee](${IMG}/A_small_cup_of_coffee.JPG)\n\n` +
              "Specialty coffee is graded on a 100-point scale; 80+ is 'specialty'. 📈\n\n" +
              "| Sample | Roast | Score |\n|---|---|--:|\n" +
              "| 🇪🇹 Yirgacheffe | light | 88 |\n| 🇨🇴 Huila | medium | 84 |",
          },
        ],
      },
    ],
  },
];
