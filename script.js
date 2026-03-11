const items = {
        legendary: [
          {
            name: "Brain",
            emoji: "🧠",
            desc: "finally😘",
          },
           ],
        epic: [
          { name: "unicorn", emoji: "🦄", desc: "pet" },
          {
            name: "mammoth",
            emoji: "🦣",
            desc: "pet",
          },
          { name: "alien", emoji: "👽", desc: "pet" },
          {
            name: "dragon",
            emoji: "🐲",
            desc: "pet",
          },
        ],
        rare: [
          { name: "dawg", emoji: "🐕‍🦺", desc: "pet" },
          { name: "pih", emoji: "🐷", desc: "pet" },
          { name: "zebra", emoji: "🦓", desc: "pet" },
          { name: "horse", emoji: "🐴", desc: "pet" },
          { name: "fish", emoji: "🐟", desc: "eat" },
          { name: "ghost", emoji: "👻", desc: "สวดมนต์เอาเด้อ" },
        ],
        uncommon: [
          { name: "golf", emoji: "🏌️‍♀️", desc: "ตีgolf" },
          { name: "police", emoji: "👮‍♂️", desc: "จับคน" },
          { name: "vampire", emoji: "🧛", desc: "ดูดเลือด" },
          { name: "sigma", emoji: "🧏", desc: "แอ็ค" },
          { name: "mermaid", emoji: "🧜‍♀️", desc: "ใต้น้ำ" },
          {
            name: "santa",
            emoji: "🎅",
            desc: "แจกของ",
          },
        ],
        common: [
          { name: "poop", emoji: "💩", desc: "suck😹" },

        ],
      };
      // State
      let currency = 1000;
      let history = [];
      let stats = { total: 0, legendary: 0, epic: 0, rare: 0 };

      // Default config for Element SDK
      const defaultConfig = {
        page_title: "😘 Mali City 😘",
        banner_title: "🧠 most ppl have but u don't 🤏🧠",
        pull_button_text: "🎰 สุ่ม 1 ครั้ง",
        background_color: "#0f172a",
        surface_color: "#1e1b4b",
        text_color: "#e9d5ff",
        primary_color: "#f59e0b",
        secondary_color: "#9333ea",
        font_family: "Kanit",
        font_size: 16,
      };

      // Gacha logic
      function getRandomRarity() {
        const roll = Math.random() * 100;
        if (roll < 1) return "legendary";
        if (roll < 5) return "epic";
        if (roll < 20) return "rare";
        if (roll < 50) return "uncommon";
        return "common";
      }

      function getRandomItem(rarity) {
        const pool = items[rarity];
        return { ...pool[Math.floor(Math.random() * pool.length)], rarity };
      }

      function getRarityColor(rarity) {
        const colors = {
          legendary: "rarity-legendary",
          epic: "rarity-epic",
          rare: "rarity-rare",
          uncommon: "rarity-uncommon",
          common: "rarity-common",
        };
        return colors[rarity];
      }

      function getRarityLabel(rarity) {
        const labels = {
          legendary: "💎 Mahoraga",
          epic: "🧎‍♂️ Gojo",
          rare: "🤖 Shizuka",
          uncommon: "🤡 Nobita",
          common: "💩 Poop",
        };
        return labels[rarity];
      }

      function updateCurrency() {
        document.getElementById("currency").textContent =
          currency.toLocaleString();
      }

      function updateStats() {
        document.getElementById("stat-total").textContent = stats.total;
        document.getElementById("stat-legendary").textContent = stats.legendary;
        document.getElementById("stat-epic").textContent = stats.epic;
        document.getElementById("stat-rare").textContent = stats.rare;
      }

      function showResult(item, isMulti = false) {
        const placeholder = document.getElementById("result-placeholder");
        const resultItem = document.getElementById("result-item");

        placeholder.classList.add("hidden");
        resultItem.classList.remove("hidden");
        resultItem.innerHTML = "";

        const card = document.createElement("div");
        card.className = `${getRarityColor(
          item.rarity
        )} rounded-2xl p-6 animate-bounce-in`;
        card.innerHTML = `
        <div class="text-6xl mb-3">${item.emoji}</div>
        <div class="text-2xl font-bold text-white mb-1">${item.name}</div>
        <div class="text-sm text-white/80 mb-2">${item.desc}</div>
        <div class="inline-block px-3 py-1 rounded-full bg-black/20 text-white text-sm font-semibold">
          ${getRarityLabel(item.rarity)}
        </div>
      `;

        resultItem.appendChild(card);

        // Add stars effect for legendary/epic
        if (item.rarity === "legendary" || item.rarity === "epic") {
          for (let i = 0; i < 8; i++) {
            const star = document.createElement("div");
            star.className = "absolute text-2xl animate-stars";
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 0.5}s`;
            star.textContent = "✨";
            resultItem.appendChild(star);
          }
        }
      }

      function addToHistory(item) {
        history.unshift(item);
        if (history.length > 50) history.pop();

        const historyContainer = document.getElementById("history");

        if (history.length === 1) {
          historyContainer.innerHTML = "";
        }

        const card = document.createElement("div");
        card.className = `item-card ${getRarityColor(
          item.rarity
        )} rounded-xl p-3 text-center`;
        card.innerHTML = `
        <div class="text-2xl mb-1">${item.emoji}</div>
        <div class="text-xs font-semibold text-white truncate">${item.name}</div>
      `;

        historyContainer.insertBefore(card, historyContainer.firstChild);

        if (historyContainer.children.length > 20) {
          historyContainer.removeChild(historyContainer.lastChild);
        }
      }

      function pull(count) {
        const cost = count === 1 ? 100 : 900;

        if (currency < cost) {
          const resultItem = document.getElementById("result-item");
          const placeholder = document.getElementById("result-placeholder");
          placeholder.classList.add("hidden");
          resultItem.classList.remove("hidden");
          resultItem.innerHTML = `
          <div class="text-center text-red-400">
            <div class="text-5xl mb-3">😢</div>
            <div class="text-xl font-semibold">coinไม่พอ!</div>
            <div class="text-sm mt-2">ต้องการ 🪙 ${cost} แต่มีเพียง 🪙 ${currency}</div>
          </div>
        `;
          return;
        }

        currency -= cost;
        updateCurrency();

        const results = [];
        for (let i = 0; i < count; i++) {
          const rarity = getRandomRarity();
          const item = getRandomItem(rarity);
          results.push(item);

          stats.total++;
          if (rarity === "legendary") stats.legendary++;
          if (rarity === "epic") stats.epic++;
          if (rarity === "rare") stats.rare++;

          addToHistory(item);
        }

        updateStats();

        // Show best result for multi-pull
        if (count > 1) {
          const rarityOrder = [
            "legendary",
            "epic",
            "rare",
            "uncommon",
            "common",
          ];
          const best = results.sort(
            (a, b) =>
              rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
          )[0];
          showResult(best, true);
        } else {
          showResult(results[0]);
        }
      }

      // Element SDK Setup
      async function onConfigChange(config) {
        const cfg = { ...defaultConfig, ...config };

        document.getElementById("page-title").textContent = cfg.page_title;
        document.getElementById("banner-title").textContent = cfg.banner_title;
        document.getElementById("pull-button-text").textContent =
          cfg.pull_button_text;

        // Apply colors
        document.body.style.background = `linear-gradient(135deg, ${cfg.background_color} 0%, ${cfg.surface_color} 50%, ${cfg.background_color} 100%)`;

        // Apply font
        document.querySelectorAll("*").forEach((el) => {
          if (el.style) {
            el.style.fontFamily = `${cfg.font_family}, Kanit, sans-serif`;
          }
        });
      }

      function mapToCapabilities(config) {
        const cfg = { ...defaultConfig, ...config };
        return {
          recolorables: [
            {
              get: () => cfg.background_color || defaultConfig.background_color,
              set: (value) => {
                cfg.background_color = value;
                window.elementSdk.setConfig({ background_color: value });
              },
            },
            {
              get: () => cfg.surface_color || defaultConfig.surface_color,
              set: (value) => {
                cfg.surface_color = value;
                window.elementSdk.setConfig({ surface_color: value });
              },
            },
            {
              get: () => cfg.text_color || defaultConfig.text_color,
              set: (value) => {
                cfg.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              },
            },
            {
              get: () => cfg.primary_color || defaultConfig.primary_color,
              set: (value) => {
                cfg.primary_color = value;
                window.elementSdk.setConfig({ primary_color: value });
              },
            },
            {
              get: () => cfg.secondary_color || defaultConfig.secondary_color,
              set: (value) => {
                cfg.secondary_color = value;
                window.elementSdk.setConfig({ secondary_color: value });
              },
            },
          ],
          borderables: [],
          fontEditable: {
            get: () => cfg.font_family || defaultConfig.font_family,
            set: (value) => {
              cfg.font_family = value;
              window.elementSdk.setConfig({ font_family: value });
            },
          },
          fontSizeable: {
            get: () => cfg.font_size || defaultConfig.font_size,
            set: (value) => {
              cfg.font_size = value;
              window.elementSdk.setConfig({ font_size: value });
            },
          },
        };
      }

      function mapToEditPanelValues(config) {
        const cfg = { ...defaultConfig, ...config };
        return new Map([
          ["page_title", cfg.page_title],
          ["banner_title", cfg.banner_title],
          ["pull_button_text", cfg.pull_button_text],
        ]);
      }

      // Initialize
      if (window.elementSdk) {
        window.elementSdk.init({
          defaultConfig,
          onConfigChange,
          mapToCapabilities,
          mapToEditPanelValues,
        });
      }

      // Event listeners
      document
        .getElementById("pull-1")
        .addEventListener("click", () => pull(1));
      document
        .getElementById("pull-10")
        .addEventListener("click", () => pull(10));

      // Initialize Lucide icons
      lucide.createIcons();

      (function () {
        function c() {
          var b = a.contentDocument || a.contentWindow.document;
          if (b) {
            var d = b.createElement("script");
            d.innerHTML =
              "window.__CF$cv$params={r:'9da9cde0d6f345b4',t:'MTc3MzIyNDE5Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName("head")[0].appendChild(d);
          }
        }
        if (document.body) {
          var a = document.createElement("iframe");
          a.height = 1;
          a.width = 1;
          a.style.position = "absolute";
          a.style.top = 0;
          a.style.left = 0;
          a.style.border = "none";
          a.style.visibility = "hidden";
          document.body.appendChild(a);
          if ("loading" !== document.readyState) c();
          else if (window.addEventListener)
            document.addEventListener("DOMContentLoaded", c);
          else {
            var e = document.onreadystatechange || function () {};
            document.onreadystatechange = function (b) {
              e(b);
              "loading" !== document.readyState &&
                ((document.onreadystatechange = e), c());
            };
          }
        }

      })();
