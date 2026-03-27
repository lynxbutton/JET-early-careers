import { pingServer, fetchRestaurants } from "./api";
import { Card } from "./cards";
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
  //Array to hold all cards
  const cards = [];

  //Event listener that triggers after text submission
  //TO-DO: Move all this into separate functions/files to keep main() clear
  form.addEventListener("submit", async (event) => {
    //Allows for submit to be triggered via the enter button
    event.preventDefault();
    //Get data from server for the 10 restaurants needed
    const restaurants: Restaurant[] = await fetchRestaurants(input?.value);

    //Remove all children to 'reset' the search
    //This is done after the await to prevent a flash of no text
    app?.replaceChildren();

    //TO-DO: Improve this system, a class of cards would likely be useful
    for (const restaurant of restaurants) {
      const card: Card = new Card(document, restaurant);
      cards.push(card);
      app?.appendChild(card.returnBody());
    }
  });
}

main();
