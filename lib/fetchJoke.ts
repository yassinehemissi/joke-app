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

export default async function fetchJoke() {
  const jokeResponse = await fetch(JOKE_API_URL, { cache: "no-store" });

  if (!jokeResponse.ok) {
    throw new Error("Failed to reach Joke API.");
  }

  const jokeData = (await jokeResponse.json()) as JokeApiData;

  if (jokeData.error) {
    throw new Error("Joke API returned an error.");
  }

  return jokeData;
}
