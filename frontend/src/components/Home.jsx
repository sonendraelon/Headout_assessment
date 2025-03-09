// Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Fade,
  Zoom,
} from "@mui/material";
import SharePopup from "./SharePopup";

const Home = () => {
  const [username, setUsername] = useState("");
  const [showShare, setShowShare] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) return;
    try {
      await axios.post(
        "https://headout-assessment-3.onrender.com/api/users/register",
        {
          username,
        }
      );
      localStorage.setItem("username", username);
      navigate("/game");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChallenge = () => {
    if (!username) {
      alert("Please enter a username first");
      return;
    }
    localStorage.setItem("username", username);
    setShowShare(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #000428, #004e92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="md">
        <Zoom in timeout={500}>
          <Paper
            elevation={10}
            sx={{
              padding: { xs: 3, sm: 4, md: 6 },
              borderRadius: 4,
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                color: "#fff",
                mb: { xs: 2, sm: 3, md: 4 },
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: {
                  xs: "2rem",
                  sm: "3rem",
                  md: "4rem",
                  lg: "5rem",
                  xl: "6rem",
                },
              }}
            >
              🌍 Globetrotter Challenge
            </Typography>

            <Fade in timeout={800}>
              <Box
                component="form"
                onSubmit={handleRegister}
                sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Choose your explorer name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#fff" },
                      "&:hover fieldset": { borderColor: "#90caf9" },
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: {
                        xs: "0.8rem", // extra small screens
                        sm: "1rem", // small screens
                        md: "1.2rem", // medium screens (tablets)
                        lg: "1.4rem", // large screens
                        xl: "1.6rem", // extra large screens
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    py: { xs: 1, sm: 2 },
                    px: { xs: 4, sm: 6 },
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                  }}
                >
                  Start Adventure
                </Button>
              </Box>
            </Fade>

            <Fade in timeout={1200}>
              <Box>
                <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                  Challenge fellow explorers!
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleChallenge}
                  size="large"
                  sx={{
                    py: { xs: 1, sm: 2 },
                    px: { xs: 4, sm: 6 },
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    background:
                      "linear-gradient(45deg, #FF4081 30%, #F50057 90%)",
                    boxShadow: "0 3px 5px 2px rgba(255, 64, 129, .3)",
                  }}
                >
                  🏆 Challenge Friends
                </Button>
              </Box>
            </Fade>

            {showShare && (
              <SharePopup
                username={username}
                onClose={() => setShowShare(false)}
              />
            )}
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Home;
