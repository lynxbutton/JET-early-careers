import { ElementOptions, Restaurant } from "./types";

export class Card {
  //HTML Elements
  private body: HTMLDivElement;
  private logo: HTMLImageElement;
  private name: HTMLHeadingElement;
  private address: HTMLParagraphElement;
  private rating: HTMLParagraphElement;
  private cuisines: HTMLParagraphElement;

  /**
   *
   */
  constructor(document: Document, restaurant: Restaurant) {
    const { name, address, rating, cuisines, logoUrl } = restaurant;
    this.body = this.createElement(document, {
      tag: "div",
      id: "card",
    }) as HTMLHeadingElement;

    //Span parent for logo & name to allow for easy styling
    let nameInline = this.createElement(document, {
      tag: "span",
      id: "name-inline",
    });
    //Logo creation
    this.logo = this.createElement(document, {
      tag: "img",
      src: logoUrl,
    }) as HTMLImageElement;
    //Title creation
    this.name = this.createElement(document, {
      tag: "h1",
      text: name,
    }) as HTMLHeadingElement;
    nameInline.append(this.logo, this.name);

    this.address = this.createElement(document, {
      tag: "p",
      text: `${address.firstLine}, ${address.city}, ${address.postalCode}`,
    }) as HTMLParagraphElement;

    //Uses the rating to generate a string of stars representing the number
    let starRank = "";
    for (let i = 0; i < 5; i++) {
      if (Math.floor(rating) > i) {
        starRank += "★";
      } else if (rating - Math.floor(rating) > 0 && starRank[i - 1] === "★") {
        starRank += "⯪";
      } else {
        starRank += "☆";
      }
    }
    //Creation of rating element
    this.rating = this.createElement(document, {
      tag: "p",
      id: "rating",
      text: `${rating}   `,
    }) as HTMLParagraphElement;
    //Stars are added as a span to allow for easy styling
    const star = this.createElement(document, {
      tag: "span",
      text: `${starRank}`,
    }) as HTMLSpanElement;
    this.rating.appendChild(star);

    //Parent for cuisine tags
    this.cuisines = this.createElement(document, {
      tag: "ul",
      id: "cuisines",
    }) as HTMLParagraphElement;
    //Create a list section for each cuisine
    for (let i = 0; i < cuisines.length - 1; i++) {
      this.cuisines.appendChild(
        this.createElement(document, {
          tag: "li",
          text: cuisines[i],
        }),
      );
    }

    //Append all child to the card
    this.body.append(nameInline, this.address, this.rating, this.cuisines);
  }

  public returnBody() {
    return this.body;
  }

  private createElement(document: Document, options: ElementOptions) {
    //Ideally this would be mapped with a HTMLElement Map to prevent unneeded casting
    const el = document.createElement(options.tag);
    if (options.id) el.id = options.id;
    if (options.src) (el as HTMLImageElement).src = options.src;
    if (options.text) el.textContent = options.text;

    return el;
  }
}
