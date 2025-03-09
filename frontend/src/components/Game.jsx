// Game.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grow,
  Zoom,
  Slide,
  Avatar,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  EmojiEvents,
  Public,
  TravelExplore,
  Celebration,
} from "@mui/icons-material";

const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create("transform"),
  "&:hover": {
    transform: "scale(1.05)",
  },
  background: "linear-gradient(145deg, #1a237e 30%, #0d47a1 90%)",
  color: "white",
  borderRadius: "20px",
  padding: "1rem",
  margin: "1rem 0",
}));

const Game = () => {
  const [gameData, setGameData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const fetchGameData = async () => {
    try {
      const res = await axios.get(
        "https://headout-assessment-3.onrender.com/api/destinations/game"
      );
      setGameData(res.data);
      setFeedback(null);
      setShowConfetti(false);
      setProgress(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGameData();
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleGuess = async (guess) => {
    try {
      const res = await axios.post(
        "https://headout-assessment-3.onrender.com/api/destinations/guess",
        {
          destinationId: gameData.destinationId,
          guess: guess.name, // Ensure guess is a string
        }
      );
      setFeedback(res.data);
      await axios.post(
        `https://headout-assessment-3.onrender.com/api/users/${username}/score`,
        {
          result: res.data.correct ? "correct" : "incorrect",
        }
      );
      if (res.data.correct) {
        setShowConfetti(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    fetchGameData();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleGuess(option);
  };

  if (!gameData)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <TravelExplore sx={{ fontSize: 80, mr: 2 }} />
        <Typography variant="h4">Loading Adventure...</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #000428, #004e92)",
        padding: { xs: 2, sm: 4, md: 6 },
        color: "white",
      }}
    >
      <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 4 } }}
        >
          <Public sx={{ fontSize: { xs: 30, sm: 40 }, mr: 2 }} />
          <Typography variant="h3" sx={{ fontFamily: "'Pacifico', cursive" }}>
            Globetrotter Challenge
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, mb: 4 }}
        />

        <AnimatedCard>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TravelExplore sx={{ mr: 1 }} /> Destination Clues
            </Typography>
            {gameData.clues.map((clue, index) => (
              <Slide key={index} direction="up" in timeout={500}>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: "flex", alignItems: "center" }}
                >
                  🧩 {clue}
                </Typography>
              </Slide>
            ))}
          </CardContent>
        </AnimatedCard>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 2,
            my: { xs: 2, sm: 4 },
          }}
        >
          {gameData.options.map((option, index) => (
            <Grow in timeout={500} key={index}>
              <Button
                variant="contained"
                onClick={() => handleOptionSelect(option)}
                disabled={feedback !== null}
                sx={{
                  py: { xs: 2, sm: 3 },
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  background:
                    feedback?.correctAnswer === option ? "#4CAF50" : "#2196F3",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "all 0.3s",
                }}
              >
                {option.name}
              </Button>
            </Grow>
          ))}
        </Box>

        {feedback && (
          <Zoom in>
            <AnimatedCard
              sx={{ background: feedback.correct ? "#2E7D32" : "#C62828" }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {feedback.correct ? <Celebration sx={{ mr: 2 }} /> : "😢"}
                  {feedback.correct ? "Bravo Explorer!" : "Almost There!"}
                </Typography>
                {!feedback.correct && (
                  <Typography variant="h5" gutterBottom>
                    Correct Answer: {feedback.correctAnswer}
                  </Typography>
                )}
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    🌍 Fun Fact:
                  </Typography>
                  <Typography paragraph>{feedback.fun_fact}</Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    📚 Trivia:
                  </Typography>
                  <Typography paragraph>{feedback.trivia}</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, fontSize: "1.2rem", py: 2 }}
                  startIcon={<EmojiEvents />}
                >
                  Next Challenge
                </Button>
              </CardContent>
            </AnimatedCard>
          </Zoom>
        )}

        {showConfetti && (
          <Confetti
            recycle={false}
            numberOfPieces={1000}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}

        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{
            mt: 4,
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "#4CAF50" },
          }}
        >
          🏡 Return to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
