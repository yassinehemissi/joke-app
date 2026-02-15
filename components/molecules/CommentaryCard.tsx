import BodyText from "../atoms/BodyText";
import SectionTitle from "../atoms/SectionTitle";

type CommentaryCardProps = {
  comment: string;
  explanation: string;
  isLoading: boolean;
};

export default function CommentaryCard({
  comment,
  explanation,
  isLoading,
}: CommentaryCardProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_20px_60px_rgba(40,24,10,0.06)] backdrop-blur">
      <SectionTitle>AI Commentary</SectionTitle>
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 w-3/4 rounded-full bg-black/10" />
          <div className="h-4 w-2/3 rounded-full bg-black/10" />
          <div className="h-4 w-5/6 rounded-full bg-black/10" />
        </div>
      ) : (
        <div className="space-y-4">
          <BodyText>{comment}</BodyText>
          <BodyText tone="muted">{explanation}</BodyText>
        </div>
      )}
    </section>
  );
}
