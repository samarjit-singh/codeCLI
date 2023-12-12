const axios = require("axios");
const { API_URL, API_KEY } = require("../__config");

function formatCodeForPrompt(code) {
  return `
    ${code}
  `;
}

async function getExplanationFromAPI(code) {
  const formattedCode = formatCodeForPrompt(code);
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo-0613",
        messages: [{ role: "user", content: `Explain ${formattedCode}` }],
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to get code explanation from API: ${error.message}`
    );
  }
}

module.exports = { getExplanationFromAPI };
