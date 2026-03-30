import { ElementOptions, Restaurant } from "./types";

/**
 * Represents all of a single restaurants basic data to the client
 */
export class Card {
  //HTML Elements
  private body: HTMLDivElement;
  private logo: HTMLImageElement;
  private name: HTMLHeadingElement;
  private address: HTMLParagraphElement;
  private rating: HTMLParagraphElement;
  private cuisines: HTMLParagraphElement;

  /**
   * Constructor that uses all given restaurant data to generate and create HTML elements with this data
   * @params Webpage document
   * @params Restaurant Object
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

  /**
   * Appends the body of this class to the given element
   * @params Parent element to attach to
   */
  public attachBody(app: HTMLElement | null) {
    app?.appendChild(this.body);
  }

  /**
   * Creates a HTML element using the Element options interface
   * In a bigger project this type of function would be part of a service or an exported function.
   *    This would have been a better choice for this project as well as
   *    there is error showing text in Client.ts that could've been created
   *    within this function if it wasn't within this class.
   * @params Webpage document
   * @params Object of element options
   * @returns void
   */
  private createElement(document: Document, options: ElementOptions) {
    //Ideally this would be mapped with a HTMLElement Map to prevent unneeded casting
    const el = document.createElement(options.tag);
    if (options.id) el.id = options.id;
    if (options.src) (el as HTMLImageElement).src = options.src;
    if (options.text) el.textContent = options.text;

    return el;
  }
}
