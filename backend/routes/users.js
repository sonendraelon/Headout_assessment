const router = require("express").Router();
const User = require("../models/User");

// Register user
router.post("/register", async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = new User({ username });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user profile
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user score
router.post("/:username/score", async (req, res) => {
  const { username } = req.params;
  const { result } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (result === "correct") {
      user.score += 1;
    } else if (result === "incorrect") {
      user.score -= 1;
    }
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
