"use client";

import { useEffect, useState } from "react";
import BodyText from "../components/atoms/BodyText";
import PrimaryButton from "../components/atoms/PrimaryButton";
import JokePanel from "../components/organisms/JokePanel";

type JokeData = {
  category: string;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  safe: boolean;
};

type CommentaryData = {
  comment: string;
  explanation: string;
};

type JokeApiResponse = {
  joke: JokeData;
  ai: CommentaryData;
};

export default function Home() {
  const [joke, setJoke] = useState<JokeData | null>(null);
  const [commentary, setCommentary] = useState<CommentaryData>({
    comment: "",
    explanation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/joke", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to fetch a joke right now.");
      }

      const data = (await response.json()) as JokeApiResponse;
      setJoke(data.joke);
      setCommentary(data.ai);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchJoke();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden px-6 pb-16 pt-12 text-[var(--ink)] sm:px-12">
      <div className="absolute -right-40 top-20 h-72 w-72 rounded-full bg-[var(--highlight)] opacity-40 blur-3xl" />
      <div className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-[var(--accent)] opacity-30 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--ink-soft)]">
            Joke App
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Fresh jokes, instant AI commentary.
          </h1>
          <BodyText tone="muted">
            Pull a random joke from JokeAPI, then let a tiny AI critic unpack
            what makes it funny (or not). Refresh any time for a new take.
          </BodyText>
          <PrimaryButton onClick={fetchJoke} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Another Joke"}
          </PrimaryButton>
        </header>

        <JokePanel
          joke={joke}
          commentary={commentary}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
}
