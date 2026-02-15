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