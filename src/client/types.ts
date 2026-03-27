// Response Interfaces --------------------------------

//Restaurant Data
export interface Restaurant {
  name: string;
  cuisines: string[];
  rating: number;
  address: Address;
  logoUrl: string;
}
//More specific address data
export interface Address {
  city: string;
  firstLine: string;
  postalCode: string;
}

// Card Interfaces --------------------------------

/**
 * Options for Element initialization
 *
 * Object.assign could be used for this instead however it would be slower
 * While that isn't a big deal for this project it may be in a far bigger one
 */
export interface ElementOptions {
  tag: string;
  text: string;
  id?: string;
}
