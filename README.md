# Globetrotter - The Ultimate Travel Guessing Game!

Welcome to **Globetrotter**, a full-stack web app where users get cryptic clues about a famous place and must guess which destination it refers to. Once they guess, they’ll unlock fun facts, trivia, and surprises about the destination!

## Table of Contents

- [Project Overview](#project-overview)
- [Frontend](#frontend)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
- [Backend](#backend)
  - [Technologies Used](#technologies-used-1)
  - [Features](#features-1)
- [Setup Instructions](#setup-instructions)

## Project Overview

Globetrotter is designed to be an engaging and educational game that tests users' knowledge of famous destinations around the world. The game provides clues, fun facts, and trivia for each destination, making it a fun way to learn about different places.

## Frontend

### Technologies Used

- React
- Vite
- ESLint
- CSS for styling
- Confetti.js for animations

### Features

- **Random Clues:** Present 1–2 random clues from the chosen destination.
- **Multiple Choice Answers:** Let the user select from multiple possible destination answers.
- **Feedback Animations:**
  - 🎉 _Correct Answer:_ Animate confetti and reveal a fun fact.
  - 😢 _Incorrect Answer:_ Show a sad-face animation and reveal a fun fact.
- **Play Again/Next Button:** Load a different random destination.
- **User Score:** Display total user score, tracking correct and incorrect answers.
- **Challenge a Friend:**
  - User enters a unique username before inviting friends to play.
  - Share popup with a dynamic image & invite link for WhatsApp.
  - Invited friend can see the invitee’s score before playing.

## Backend

### Technologies Used

- Node.js
- Express.js
- MongoDB for database
- OpenAI API for AI integration
- Web Scraping tools for dataset expansion

### Features
