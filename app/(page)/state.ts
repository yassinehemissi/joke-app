import { useEffect, useState } from "react";

const useHome = () => {
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

	return {
		joke,
		commentary,
		isLoading,
		error,
		fetchJoke,
	};
}

export { useHome };