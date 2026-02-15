import Pill from "../atoms/Pill";

type MetaRowProps = {
  category: string;
  type: string;
  safe: boolean;
};

export default function MetaRow({ category, type, safe }: MetaRowProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Pill>{category}</Pill>
      <Pill>{type}</Pill>
      <Pill>{safe ? "Safe" : "Not Safe"}</Pill>
    </div>
  );
}
