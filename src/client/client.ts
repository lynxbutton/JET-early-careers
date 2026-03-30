import { pingServer, fetchRestaurants } from "./api";
import { Card } from "./cards";
import { Restaurant } from "./types";
/**
 * Starting point of the project
 * @returns void
 */
async function main() {
  //Wrapper for TS created elements
  const app = document.getElementById("app");

  //Ensures server accessibility ---------------------------------------------------------
  if ((await pingServer()) === false) {
    console.log("Server inaccessible, aborting...");
    generateErrorText(document, app);
    return;
  }
  //Form elements from DOM
  const form = document.getElementById("search") as HTMLFormElement;
  const input = document.getElementById("postcodeInput") as HTMLInputElement;
  //Array to hold all cards
  const cards = [];

  //Event listener that triggers after text submission ----------------------------------
  form.addEventListener("submit", async (event) => {
    //Allows for submit to be triggered via the enter button
    event.preventDefault();

    //Get data from server for the 10 restaurants needed
    const restaurants: Restaurant[] = await fetchRestaurants(input?.value);
    //Remove all children to 'reset' the search
    //This is done after the await to prevent a flash of no text
    app?.replaceChildren();
    //Ensures server/text errors are shown to the user
    if (restaurants.length === 0) {
      generateErrorText(document, app);
      return;
    }
    //Card creation ---------------------------------------
    for (const restaurant of restaurants) {
      const card: Card = new Card(document, restaurant);
      cards.push(card);
      card.attachBody(app);
    }
  });
}

/**
 * Generates error-specific text and appends it to the app
 * @params webpage document
 * @params HTML parent for card content
 * @returns void
 */
function generateErrorText(document: Document, app: HTMLElement | null) {
  //Clear elements
  app?.replaceChildren();
  //Create error text
  const errorText = document.createElement("p");
  errorText.id = "info";
  errorText.textContent =
    "An error has occurred, please enter a valid UK postcode or try again later.";
  app?.appendChild(errorText);
}

main();
