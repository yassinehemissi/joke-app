type AiPayload = {
  comment: string;
  explanation: string;
};

export default function parseAiPayload(text: string): AiPayload {
  try {
    const parsed = JSON.parse(text) as Partial<AiPayload>;

    return {
      comment: parsed.comment?.trim() ?? text.trim(),
      explanation: parsed.explanation?.trim() ?? "",
    };
  } catch {
    return {
      comment: text.trim(),
      explanation: "",
    };
  }
}
