const axios = require("axios");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;

async function expandDataset(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch data from OpenAI");
  }
}

module.exports = { expandDataset };
