// Challenge.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Zoom,
  Slide,
  Avatar,
  LinearProgress,
  Container, // Add Container import
} from "@mui/material";
import { EmojiEvents, Public, FlightTakeoff } from "@mui/icons-material";

const Challenge = () => {
  const [inviter, setInviter] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const inviterUsername = queryParams.get("user");

  useEffect(() => {
    const fetchInviter = async () => {
      try {
        const res = await axios.get(
          `https://headout-assessment-3.onrender.com/api/users/${inviterUsername}`
        );
        setInviter(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (inviterUsername) {
      fetchInviter();
    }
  }, [inviterUsername]);

  const handlePlay = () => {
    navigate("/game");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom right, #000428, #004e92)",
        }}
      >
        <FlightTakeoff
          sx={{
            fontSize: 80,
            mr: 2,
            color: "white",
            animation: "pulse 2s infinite",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #000428, #004e92)",
        padding: { xs: 2, sm: 4, md: 6 },
        color: "white",
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
              variant="h2"
              sx={{
                mb: { xs: 2, sm: 3, md: 4 },
                fontFamily: "'Pacifico', cursive",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              🏁 Challenge Accepted!
            </Typography>

            {inviter && (
              <Slide direction="up" in timeout={500}>
                <Box
                  sx={{
                    mb: 4,
                    padding: 3,
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      bgcolor: "#2196F3",
                      fontSize: "2rem",
                    }}
                  >
                    {inviterUsername[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="h4" gutterBottom>
                    {inviterUsername}'s Explorer Stats
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 4,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" color="#4CAF50">
                        ✅ Correct
                      </Typography>
                      <Typography variant="h3">{inviter.correct}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" color="#F44336">
                        ❌ Incorrect
                      </Typography>
                      <Typography variant="h3">{inviter.incorrect}</Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (inviter.correct /
                        (inviter.correct + inviter.incorrect)) *
                      100
                    }
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                </Box>
              </Slide>
            )}

            <Typography variant="h5" sx={{ mb: 4 }}>
              Ready to beat {inviterUsername}'s score?
            </Typography>

            <Button
              variant="contained"
              onClick={handlePlay}
              size="large"
              sx={{
                py: { xs: 1, sm: 2 },
                px: { xs: 4, sm: 6 },
                fontSize: { xs: "1rem", sm: "1.2rem" },
                background: "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)",
                boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                transition: "transform 0.3s",
              }}
            >
              🚀 Start Challenge
            </Button>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Challenge;
