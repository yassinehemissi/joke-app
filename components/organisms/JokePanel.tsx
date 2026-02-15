import BodyText from "../atoms/BodyText";
import CommentaryCard from "../molecules/CommentaryCard";
import JokeCard from "../molecules/JokeCard";
import MetaRow from "../molecules/MetaRow";

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

type JokePanelProps = {
  joke: JokeData | null;
  commentary: CommentaryData;
  isLoading: boolean;
  error: string | null;
};

export default function JokePanel({
  joke,
  commentary,
  isLoading,
  error,
}: JokePanelProps) {
  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <BodyText>{error}</BodyText>
      </div>
    );
  }

  if (!joke) {
    return null;
  }

  return (
    <div className="space-y-6">
      <MetaRow category={joke.category} type={joke.type} safe={joke.safe} />
      <JokeCard setup={joke.setup} delivery={joke.delivery} single={joke.joke} />
      <CommentaryCard
        comment={commentary.comment}
        explanation={commentary.explanation}
        isLoading={isLoading}
      />
    </div>
  );
}
