# Lynx Button - JET Early Careers

Hi I'm Lynx Button, I'm very excited about this opportunity and really hope you enjoy looking through this project. I have thoroughly commented my code to try and show my thought process as I worked and have done this throughout the project (as you can see through the git history). For this project I have used HTML, CSS, Typescript & Node.JS!

## Running the Development Build:

Ensure node.js & git are installed on your computer.
Clone the project then run the following commands:
`npm i`
`npm run dev`
Open your browser at http://localhost:3000/

Please note that this project hasn't been setup for a production build.

## Extra Project Information

### Project Assumptions

- The assessment brief mentions 'rating as a number', in this project I have assumed that this is the float we are given by the API and not a whole number. I have shown the number as a float as it is received and visually displayed the rating as a collection of stars.

### Next Steps

#### Immediate Steps

- Create a service/function file that would include functions all aspects of the project would use including `createElement`. Preferably I would look into what is the best way of creating HTML elements that allow all data to be set at once at initialization. If the createElement function is the best way of handling this scenario then I would look into using a HTMLElement map to prevent unnecessary casting throughout code.

#### For a bigger project

- Give each restaurant card a link to the JET page for their site.
- Create a filter that would allow the ten restaurants to be filtered by cuisine.
- Create a sort that orders by rating, high to low.

## Project Brief

We are looking for you to find restaurant data and return this in an interface of your
choice.
Using the API provided you will need to send a postcode to return a set of data, youʼll
need to filter this data to focus just on the restaurant data.
You will notice that a lot of data is returned in the ‘restaurant objectʼ (and in the whole
response!, weʼre only interested in the following pieces of data being returned:
● Name
● Cuisines
● Rating - as a number
● Address
