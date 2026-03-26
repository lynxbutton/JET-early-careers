import { Restaurant } from "./types";
// Server API -------------------------------------------

/**
 * Pings server to ensure proper setup
 * @returns Boolean based on whether the ping was successful
 */
export async function pingServer() {
  try {
    await fetch("/ping");
    return true;
  } catch (err) {
    console.log(`Error pinging server: ${err}`);
    return false;
  }
}

/**
 * Requests restaurants from the server
 * @param postcode
 * @returns restaurant data as a Restaurant[]
 */
export async function fetchRestaurants(postcode: string) {
  //Post postcode along with the request for data
  const response = await fetch("/JET", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postcode: postcode }),
  });

  //Parses data back into a JSON for use
  const text = await response.text();
  const json = JSON.parse(text) as Restaurant[];

  return json;
}
