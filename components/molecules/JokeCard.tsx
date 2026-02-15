import BodyText from "../atoms/BodyText";
import SectionTitle from "../atoms/SectionTitle";

type JokeCardProps = {
  setup?: string;
  delivery?: string;
  single?: string;
};

export default function JokeCard({ setup, delivery, single }: JokeCardProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(40,24,10,0.08)] backdrop-blur">
      <SectionTitle>Joke</SectionTitle>
      {single ? (
        <BodyText>{single}</BodyText>
      ) : (
        <div className="space-y-3">
          <BodyText>{setup}</BodyText>
          <BodyText tone="muted">{delivery}</BodyText>
        </div>
      )}
    </section>
  );
}
