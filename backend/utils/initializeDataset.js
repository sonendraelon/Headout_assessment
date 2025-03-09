const Destination = require("../models/Destination");

const starterDataset = [
  {
    name: "Paris",
    clues: [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art.",
    ],
    funFacts: [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
    ],
    trivia: [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia.",
    ],
  },
  {
    name: "Tokyo",
    clues: [
      "This city has the busiest pedestrian crossing in the world.",
      "You can visit an entire district dedicated to anime, manga, and gaming.",
    ],
    funFacts: [
      "Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!",
      "More than 14 million people live in Tokyo, making it one of the most populous cities in the world.",
    ],
    trivia: [
      "The city has over 160,000 restaurants, more than any other city in the world.",
      "Tokyo’s subway system is so efficient that train delays of just a few minutes come with formal apologies.",
    ],
  },
  {
    name: "New York",
    clues: [
      "Home to a green statue gifted by France in the 1800s.",
      "Nicknamed 'The Big Apple' and known for its Broadway theaters.",
    ],
    funFacts: [
      "The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.",
      "Times Square was once called Longacre Square before being renamed in 1904.",
    ],
    trivia: [
      "New York City has 468 subway stations, making it one of the most complex transit systems in the world.",
      "The Empire State Building has its own zip code: 10118.",
    ],
  },
];

async function initializeDataset() {
  try {
    const count = await Destination.countDocuments();
    if (count === 0) {
      await Destination.insertMany(starterDataset);
      console.log("Starter dataset initialized");
    }
  } catch (err) {
    console.error("Failed to initialize dataset:", err);
  }
}

module.exports = initializeDataset;
