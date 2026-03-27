import { ElementOptions, Restaurant } from "./types";

export class Card {
  //HTML Elements
  private body: HTMLDivElement;
  private name: HTMLHeadingElement;
  private address: HTMLParagraphElement;
  private rating: HTMLParagraphElement;
  private cuisines: HTMLParagraphElement;

  /**
   *
   */
  constructor(document: Document, restaurant: Restaurant) {
    const { name, address, rating, cuisines } = restaurant;
    this.body = document.createElement("div");

    this.name = this.createElement(document, {
      tag: "h1",
      text: name,
    }) as HTMLHeadingElement;

    this.address = this.createElement(document, {
      tag: "p",
      text: `${address.firstLine}, ${address.city}, ${address.postalCode}`,
    }) as HTMLParagraphElement;

    this.rating = this.createElement(document, {
      tag: "p",
      text: `${rating} out of 5`,
    }) as HTMLParagraphElement;

    this.cuisines = this.createElement(document, {
      tag: "p",
      text: cuisines.join(", "),
    }) as HTMLParagraphElement;

    this.body.append(this.name, this.address, this.rating, this.cuisines);
  }

  public returnBody() {
    return this.body;
  }

  private createElement(document: Document, options: ElementOptions) {
    //Ideally this would be mapped with a HTMLElement Map to prevent unneeded casting
    const el = document.createElement(options.tag);
    if (options.id) el.id = options.id;
    //TO-DO: add a check for what tags can have this
    el.textContent = options.text;

    return el;
  }
}
