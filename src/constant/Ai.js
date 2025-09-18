import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
  // Input validation
  if (
    !ingredientsArr ||
    !Array.isArray(ingredientsArr) ||
    ingredientsArr.length === 0
  ) {
    throw new Error("Please provide a valid array of ingredients");
  }

  // Check if API token exists
  if (!import.meta.env.VITE_HF_ACCESS_TOKEN) {
    throw new Error("VITE_HF_ACCESS_TOKEN environment variable is not set");
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
      temperature: 0.7, // Added for more creative responses
    });

    if (
      !response ||
      !response.choices ||
      !response.choices[0] ||
      !response.choices[0].message
    ) {
      throw new Error("Invalid response from Hugging Face API");
    }

    return response.choices[0].message.content;
  } catch (err) {
    console.error("Error getting recipe from Mistral:", err.message);

    // Re-throw with more context
    if (err.message.includes("Invalid API token")) {
      throw new Error(
        "Invalid Hugging Face API token. Please check your VITE_HF_ACCESS_TOKEN environment variable."
      );
    } else if (err.message.includes("Model not found")) {
      throw new Error(
        "The specified model is not available. Please check the model name."
      );
    } else {
      throw new Error(`Failed to generate recipe: ${err.message}`);
    }
  }
}
