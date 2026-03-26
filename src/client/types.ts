// Interfaces --------------------------------

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
