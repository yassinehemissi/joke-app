export type JokeData = {
  category: string;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  safe: boolean;
};

export type CommentaryData = {
  comment: string;
  explanation: string;
};

export type JokeApiResponse = {
  joke: JokeData;
  ai: CommentaryData;
};