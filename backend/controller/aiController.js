import OpenAI from 'openai';
import { getStepByIdRepository } from '../repositories/stepRepository.js';
import { createBRRepository, createVersusRepository, createVersusTreeRepository } from '../repositories/stepComponentRepository.js';
import e from 'express';

process.loadEnvFile(".env");

const testConnection = async (req, res, next) => {  
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('Testing OpenAI connection...');

    const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini", // Current mainstream, cost-effective model in late 2025. Consider GPT-5 for cutting-edge features.
    messages: [
      {
        role: "user",
        content: "Say hi and confirm you're working!"
      }
    ],
    max_tokens: 50 // Limit tokens to control costs
    });

    console.log('✅ Connection successful!');
    console.log('Response:', response.choices[0].message.content);
    console.log('Tokens used:', response.usage.total_tokens);

    } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error:', error.message);

    if (error.status === 401) {
      console.error('Check your API key in .env file');
    } else if (error.status === 429) {
        console.error('Rate limit exceeded or insufficient credits');
    }
  }
}


const testCallFunctions = async (req, res, next) => {  
  try {
    const step_id = req.params.id;
    
    const user = req.user;

    let step = await getStepByIdRepository(step_id, user.id) 

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('OpenAI connection...');

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      max_tokens: 5000,
      messages: [
          {
            role: "system",
            content: "Return only valid JSON. No explanation."
          },
          {
            role: "user",
            content: `
            You are given a step object.

            Relevant fields:
            - step.id
            - step.step_component_type ("br" | "league" | "tree")
            - step.number_players

            Rules:

            If step.step_component_type === "br":
            Return an array of step.number_players objects:
            { "player_id": null, "value": null, "step_id": step.id }

            If step.step_component_type === "league":
            Return an array of (N*(N-1)/2) objects (with N = step.number_players):
            { "player1_id": null, "player2_id": null, "player1_value": null, "player2_value": null, "step_id": step.id }

            If step.step_component_type === "tree":
            - Each box represents one match between two players
            - Each match eliminates exactly one player
            - To determine one winner from N players, the number of boxes is (N - 1)

            Return an array of (step.number_players - 1) objects:
            {
              "player1_id": null,
              "player2_id": null,
              "player1_value": null,
              "player2_value": null,
              "step_id": step.id,
              "tree_position": number
            }

            tree_position values must start at (step.number_players - 1) and decrease by 1 down to 1.

            Output:
            - An array under JSON format only
            - No text, no Markdown

            Step:
            ${JSON.stringify(step)}
            `
          }
        ]
    });
    console.log('✅ Connection successful!');
    console.log('Tokens used:', response.usage.total_tokens);
    
    let data = JSON.parse(response.choices[0].message.content)

    let functionRepository = async function(){};
    if (step.step_component_type === "br") {
      functionRepository = createBRRepository
    }
    if (step.step_component_type === "league") {
      functionRepository = createVersusRepository
    }
    if (step.step_component_type === "tree") {
      functionRepository = createVersusTreeRepository
    }

    const resultPromise = data.flatMap(component => {
      return functionRepository(component, user.id);
    });
    let result = await Promise.all(resultPromise);

    return res.status(200).json({
      message: "AI response recieved",
      result : result
    });

  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error:', error.message);

    if (error.status === 401) {
      console.error('Check your API key in .env file');
    } else if (error.status === 429) {
        console.error('Rate limit exceeded or insufficient credits');
    }
  }
}
export default {
  testConnection,
  testCallFunctions,

}

