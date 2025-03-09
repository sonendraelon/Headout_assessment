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

Globetrotter is designed to be an engaging and educational game that tests users' knowledge of famous destinations around the world. The game provides clues, fun facts, and trivia for each destination, making it a fun way to learn about different places. The app is built with a modern tech stack, ensuring a smooth and interactive user experience.

## Frontend

### Technologies Used

- React
- Vite
- ESLint
- MUI for styling
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
- **Responsive Design:** Ensure the game is playable on both desktop and mobile devices.

## Backend

### Technologies Used

- Node.js
- Express.js
- MongoDB for database
- OpenAI API for AI integration
- Web Scraping tools for dataset expansion

### Features

- **User Authentication:** Secure user login and registration.
- **Destination Database:** Store and manage a database of destinations, clues, and fun facts.
- **AI Integration:** Use OpenAI API to generate new clues and trivia.
- **Web Scraping:** Expand the dataset by scraping information from reliable travel websites.
- **Score Tracking:** Maintain user scores and game history.
- **Friend Invitations:** Handle the logic for inviting friends and tracking their participation.
- **API Endpoints:** Provide endpoints for frontend to fetch clues, submit answers, and retrieve scores.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```

2. **Install dependencies for frontend and backend:**

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory and add the necessary environment variables (e.g., database connection string, API keys).

4. **Run the development servers:**

   ```bash
   cd frontend
   npm run dev
   cd ../backend
   npm start
   ```

5. **Open the app in your browser:**
   Navigate to `https://headout-assessment-frontend.onrender.com/` to start playing Globetrotter!
