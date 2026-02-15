import { generateText } from "ai";
import buildOpenRouterClient from "@/lib/buildOpenRouterClient";
import fetchJoke from "@/lib/fetchJoke";
import parseAiPayload from "@/lib/parseAiPayload";

export async function POST() {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: "Missing OPENROUTER_API_KEY." },
      { status: 500 }
    );
  }

  let jokeData: Awaited<ReturnType<typeof fetchJoke>>;

  try {
    jokeData = await fetchJoke();
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch a joke.",
      },
      { status: 502 }
    );
  }

  const jokeText =
    jokeData.type === "single"
      ? jokeData.joke ?? ""
      : `${jokeData.setup ?? ""} ${jokeData.delivery ?? ""}`.trim();

  const { model, modelId } = buildOpenRouterClient();

  const { text } = await generateText({
    model: model(modelId),
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
