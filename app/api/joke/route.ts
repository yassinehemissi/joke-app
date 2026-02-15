import fetchJoke from "@/lib/fetchJoke";
import { generateComment } from "@/lib/generateComment";

const ApiKey = process.env.OPENROUTER_API_KEY;

export async function POST() {
  if (!ApiKey) return Response.json(
    { error: "Missing OPENROUTER_API_KEY." },
    { status: 500 }
  );

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

  const ai = await generateComment(jokeData, jokeText);


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
