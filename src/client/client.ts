import { pingServer, fetchRestaurants } from "./api";
import { Restaurant } from "./types";
/**
 * Starting point of the project
 * @returns void
 */
async function main() {
  //Ensures server accessibility
  //TO-DO: Add a visible html element showing failure
  if ((await pingServer()) === false) {
    console.log("Server inaccessible, aborting...");
    return;
  }

  //Wrapper for TS created elements
  const app = document.getElementById("app");
  //Form elements from DOM
  const form = document.getElementById("search") as HTMLFormElement;
  const input = document.getElementById("postcodeInput") as HTMLInputElement;

  //Event listener that triggers after text submission
  //TO-DO: Move all this into separate functions/files to keep main() clear
  form.addEventListener("submit", async (event) => {
    //Allows for submit to be triggered via the enter button
    event.preventDefault();
    //Get data from server for the 1- restaurants needed
    const restaurants: Restaurant[] = await fetchRestaurants(input?.value);

    //TO-DO: Improve this system, a class of cards would likely be useful
    //TO-DO: Clear all cards when enter is pressed again so they don't pile up
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
