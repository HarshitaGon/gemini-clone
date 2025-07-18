const apikey = "AIzaSyDbtUTfHdsvjB6lbpyVk-yVYYkBy_z4TpA";

// To run this code, install the required packages first:
// npm install @google/genai dotenv

const { GoogleGenAI } = require('@google/genai');
require('dotenv').config(); // Load .env variables

async function generate() {
  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model = 'gemini-2.5-pro';


  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: 'INSERT_INPUT_HERE',
        },
      ],
    },
  ];

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: 'text/plain',
  };

  const response = await client.models.generateContentStream({
    model,
    contents,
    config,
  });

  for await (const chunk of response) {
    process.stdout.write(chunk.text);
  }
}

generate();



// src/config/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Google Search tool config
const tools = [
  {
    googleSearch: {},
  },
];

// Full function equivalent to Python's `generate()`
export async function generateFromGemini(promptText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

  const result = await model.generateContentStream({
    contents: [
      {
        role: "user",
        parts: [{ text: promptText }],
      },
    ],
    tools,
    generationConfig: {
      responseMimeType: "text/plain",
    },
    // thinking_config is currently not directly supported in JS SDK
  });

  let finalOutput = "";
  for await (const chunk of result.stream) {
    const part = chunk.text();
    process.stdout.write(part); // stream output live
    finalOutput += part;
  }

  return finalOutput;
}