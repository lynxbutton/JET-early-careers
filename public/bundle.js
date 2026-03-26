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

// src/client/client.ts
var require_client = __commonJS({
  "src/client/client.ts"() {
    init_api();
    async function main() {
      if (await pingServer() === false) {
        console.log("Server inaccessible, aborting...");
        return;
      }
      const app = document.getElementById("app");
      const form = document.getElementById("search");
      const input = document.getElementById("postcodeInput");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const restaurants = await fetchRestaurants(input?.value);
        const cards = [];
        for (const restaurant of restaurants) {
          const { name, address, rating, cuisines } = restaurant;
          const card = document.createElement("div");
          const nameText = document.createElement("h2");
          nameText.textContent = name;
          const addressText = document.createElement("p");
          addressText.textContent = `${address.firstLine}, ${address.city}, ${address.postalCode}`;
          const ratingText = document.createElement("p");
          ratingText.textContent = `${rating} out of 5`;
          const cuisinesText = document.createElement("p");
          cuisinesText.textContent = cuisines.join(", ");
          card.append(nameText, addressText, ratingText, cuisinesText);
          cards.push(card);
          app?.appendChild(card);
        }
      });
    }
    main();
  }
});
export default require_client();
