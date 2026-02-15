import { generateText } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider'


type JokeApiData = {
  error: boolean;
  category: string;
  type: "single" | "twopart";
  setup?: string;
  delivery?: string;
  joke?: string;
  safe: boolean;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  lang: string;
};

const JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any?format=json";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const buildOpenRouterHeaders = () => {
  const headers: Record<string, string> = {};

  if (process.env.OPENROUTER_APP_URL) {
    headers["HTTP-Referer"] = process.env.OPENROUTER_APP_URL;
  }

  if (process.env.OPENROUTER_APP_NAME) {
    headers["X-Title"] = process.env.OPENROUTER_APP_NAME;
  }

  return headers;
};

const parseAiPayload = (text: string) => {
  try {
    const parsed = JSON.parse(text) as {
      comment?: string;
      explanation?: string;
    };

    return {
      comment: parsed.comment?.trim() ?? text.trim(),
      explanation: parsed.explanation?.trim() ?? "",
    };
  } catch {
    return {
      comment: text.trim(),
      explanation: "",
    };
  }
};

export async function POST() {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: "Missing OPENROUTER_API_KEY." },
      { status: 500 }
    );
  }

  const jokeResponse = await fetch(JOKE_API_URL, { cache: "no-store" });

  if (!jokeResponse.ok) {
    return Response.json(
      { error: "Failed to reach Joke API." },
      { status: 502 }
    );
  }

  const jokeData = (await jokeResponse.json()) as JokeApiData;

  if (jokeData.error) {
    return Response.json(
      { error: "Joke API returned an error." },
      { status: 502 }
    );
  }

  const jokeText =
    jokeData.type === "single"
      ? jokeData.joke ?? ""
      : `${jokeData.setup ?? ""} ${jokeData.delivery ?? ""}`.trim();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const modelId = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o";

  const { text } = await generateText({
    model: openrouter(modelId),
    system:
      "You are a witty but respectful comedy critic. Keep it concise and insightful.",
    prompt: `Joke: "${jokeText}"
Category: ${jokeData.category}
Flags: nsfw=${jokeData.flags.nsfw}, religious=${jokeData.flags.religious}, political=${jokeData.flags.political}, racist=${jokeData.flags.racist}, sexist=${jokeData.flags.sexist}, explicit=${jokeData.flags.explicit}

Return JSON only with this shape:
{"comment":"...","explanation":"..."}`,
  });

  const ai = parseAiPayload(text);

  return Response.json({
    joke: {
      category: jokeData.category,
      type: jokeData.type,
      setup: jokeData.setup,
      delivery: jokeData.delivery,
      joke: jokeData.joke,
      safe: jokeData.safe,
    },
    ai,
  });
}
