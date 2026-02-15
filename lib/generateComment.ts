'use server'

import { generateText } from "ai";
import buildAIClient from "./aiClient";
import { JokeApiData } from "./fetchJoke";
import parseAiPayload from "./parseAiPayload";


export const generateComment = async (jokeData: JokeApiData, jokeText: string) => {
	const { model, modelId } = await buildAIClient();

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

	return ai
}