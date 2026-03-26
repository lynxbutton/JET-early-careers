//Interfacing Definition ---------------------------------------------

/**
 * How restaurant data is expected to be received from JET
 * Only the data that will be accessed needs to be typed here
 */
export interface ServerRestaurant {
  name: string;
  cuisines: { name: string }[];
  rating: { starRating: number };
  address: Address;
  logoUrl: string;
}
/**
 * How the client expects to use the data
 */
export interface ClientRestaurant {
  name: string;
  cuisines: string[];
  rating: number;
  address: Address;
  logoUrl: string;
}
/**
 * Both responses use the same Address format so this is best defined separately
 */
export interface Address {
  city: string;
  firstLine: string;
  postalCode: string;
}
