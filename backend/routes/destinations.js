const router = require("express").Router();
const Destination = require("../models/Destination");
const { expandDataset } = require("../utils/openai");

// Fetch random destination
router.get("/random", async (req, res) => {
  try {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit answer
router.post("/submit", async (req, res) => {
  const { destinationId, answer } = req.body;
  try {
    const destination = await Destination.findById(destinationId);
    const isCorrect = destination.name.toLowerCase() === answer.toLowerCase();
    res.json({ isCorrect, funFact: destination.funFacts[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Expand dataset
router.post("/expand", async (req, res) => {
  const { prompt } = req.body;
  try {
    const expandedData = await expandDataset(prompt);
    const newDestination = new Destination(JSON.parse(expandedData));
    await newDestination.save();
    res.json(newDestination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Game route
router.get("/game", async (req, res) => {
  try {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);
    const clues = destination.clues.slice(0, 2); // Select 1-2 random clues

    // Generate options (including the correct answer and some incorrect ones)
    const options = await Destination.aggregate([
      { $sample: { size: 3 } },
      { $project: { name: 1 } },
    ]);
    options.push({ name: destination.name });
    options.sort(() => Math.random() - 0.5); // Shuffle options

    res.json({ clues, destinationId: destination._id, options });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Guess route
router.post("/guess", async (req, res) => {
  const { destinationId, guess } = req.body;
  try {
    const destination = await Destination.findById(destinationId);
    const isCorrect =
      destination.name.toLowerCase() === String(guess).toLowerCase();
    const funFact = destination.funFacts[0];
    const trivia = destination.trivia[0];
    res.json({
      correct: isCorrect,
      correctAnswer: destination.name,
      funFact,
      trivia,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
