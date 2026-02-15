import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const DEFAULT_MODEL = "openai/gpt-4o";

export default function buildOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY ?? "";

  const openrouter = createOpenRouter({
    apiKey,
  });

  return {
    model: openrouter,
    modelId: process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL,
  };
}
