var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/client/api.ts
async function pingServer() {
  try {
    await fetch("/ping");
    return true;
  } catch (err) {
    console.log(`Error pinging server: ${err}`);
    return false;
  }
}
async function fetchRestaurants(postcode) {
  const response = await fetch("/JET", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ postcode })
  });
  const text = await response.text();
  const json = JSON.parse(text);
  return json;
}
var init_api = __esm({
  "src/client/api.ts"() {
    "use strict";
  }
});

// src/client/cards.ts
var Card;
var init_cards = __esm({
  "src/client/cards.ts"() {
    "use strict";
    Card = class {
      //HTML Elements
      body;
      name;
      address;
      rating;
      cuisines;
      /**
       *
       */
      constructor(document2, restaurant) {
        const { name, address, rating, cuisines } = restaurant;
        this.body = document2.createElement("div");
        this.name = this.createElement(document2, {
          tag: "h1",
          text: name
        });
        this.address = this.createElement(document2, {
          tag: "p",
          text: `${address.firstLine}, ${address.city}, ${address.postalCode}`
        });
        this.rating = this.createElement(document2, {
          tag: "p",
          text: `${rating} out of 5`
        });
        this.cuisines = this.createElement(document2, {
          tag: "p",
          text: cuisines.join(", ")
        });
        this.body.append(this.name, this.address, this.rating, this.cuisines);
      }
      returnBody() {
        return this.body;
      }
      createElement(document2, options) {
        const el = document2.createElement(options.tag);
        if (options.id) el.id = options.id;
        el.textContent = options.text;
        return el;
      }
    };
  }
});

// src/client/client.ts
var require_client = __commonJS({
  "src/client/client.ts"() {
    init_api();
    init_cards();
    async function main() {
      if (await pingServer() === false) {
        console.log("Server inaccessible, aborting...");
        return;
      }
      const app = document.getElementById("app");
      const form = document.getElementById("search");
      const input = document.getElementById("postcodeInput");
      const cards = [];
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const restaurants = await fetchRestaurants(input?.value);
        app?.replaceChildren();
        for (const restaurant of restaurants) {
          const card = new Card(document, restaurant);
          cards.push(card);
          app?.appendChild(card.returnBody());
        }
      });
    }
    main();
  }
});
export default require_client();
