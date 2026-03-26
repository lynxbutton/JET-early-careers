import express from "express";
import path from "path";
import axios from "axios";
import { Address, ClientRestaurant, ServerRestaurant } from "./types";

//Setup express server
const server = express();
server.use(express.json());
//Fetch and find public folder
const publicPath = path.join(process.cwd(), "public");
server.use(express.static(publicPath));

//Function Definition ---------------------------------------------

/**
 * Parser/filter from the JET response to the client response
 * Removes all unneeded data
 * @param responses - All restaurants in the JET response
 * @returns All newly formatted client restaurants within an array
 */
function parseJETResponse(responses: Array<ServerRestaurant>) {
  //Array to hold all new formatted responses
  const data: ClientRestaurant[] = [];
  for (const response of responses) {
    //Direct pull off the response as they are formatted the same
    const newAddress: Address = {
      city: response.address.city,
      firstLine: response.address.firstLine,
      postalCode: response.address.postalCode,
    };
    //Each name is pulled out separately as uniqueName is not needed for our use case
    const newCuisines: string[] = [];
    for (const obj of response.cuisines) {
      newCuisines.push(obj.name);
    }
    //Nearly a direct pull excluding rating, cuisines & address
    //This makes it perfectly readable for the client with the least amount of unnecessary data possible
    const newRestaurant: ClientRestaurant = {
      name: response.name,
      cuisines: newCuisines,
      rating: response.rating.starRating,
      address: newAddress,
      logoUrl: response.logoUrl,
    };
    data.push(newRestaurant);
  }
  return data;
}

//API calls ---------------------------------------------

/**
 * Server ping to ensure replies
 */
server.get("/ping", (req, res) => {
  res.json();
});

/**
 * Fetch JET data based on given postcode
 * @param req - Client request including postcode
 * @throws Response/Request Error - JET inaccessible
 */
server.post("/JET", async (req, res) => {
  const { postcode } = req.body;
  try {
    const response = await axios.get(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
    );

    //Limit response to only the necessary restaurants
    const limitedResponse: Array<ServerRestaurant> =
      response.data.restaurants.slice(0, 10);
    //Filter out all information unneeded for the client
    //This keeps the client-side neat and prevents unnecessary access to data which helps with optimization and privacy
    const newResponse = parseJETResponse(limitedResponse);
    //Return filtered response
    res.json(newResponse);
  } catch (err) {
    //Catch & inform of JET server issues
    console.log(`JET API cannot be reached: ${err}`);
  }
});

//Start the server --------------------------------------
server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
