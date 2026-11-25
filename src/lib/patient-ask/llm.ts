export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type AiConfig = {
  key: string;
  baseUrl: string;
  model: string;
};

export function resolveAiConfig(): AiConfig | null {
  const key = process.env.AI_API_KEY?.trim() || "";
  if (!key) return null;

  const isOpenRouter = key.startsWith("sk-or-");
  const baseUrl = (
    process.env.AI_BASE_URL?.trim() ||
    (isOpenRouter
      ? "https://openrouter.ai/api/v1"
      : "https://api.openai.com/v1")
  ).replace(/\/$/, "");

  const model =
    process.env.AI_MODEL?.trim() ||
    (isOpenRouter ? "openai/gpt-4o-mini" : "gpt-4o-mini");

  return { key, baseUrl, model };
}

type CompletionsResponse = {
  choices?: Array<{ message?: { content?: string | null } }>;
  error?: { message?: string };
};

/**
 * OpenAI-compatible chat completions (OpenAI, OpenRouter, etc.).
 */
export async function completeChat(
  config: AiConfig,
  messages: ChatMessage[],
): Promise<string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.key}`,
    "Content-Type": "application/json",
  };

  // OpenRouter optional attribution headers (ASCII only — fetch rejects non-latin-1).
  if (config.baseUrl.includes("openrouter.ai")) {
    headers["HTTP-Referer"] = "https://www.nguyensosteopathy.com";
    headers["X-Title"] = "Nguyens Osteopathic Clinic Ask";
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: config.model,
      temperature: 0.3,
      max_tokens: 700,
      messages,
    }),
  });

  const data = (await response.json()) as CompletionsResponse;
  if (!response.ok) {
    const detail = data.error?.message || response.statusText;
    throw new Error(`AI request failed (${response.status}): ${detail}`);
  }

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("AI returned an empty answer");
  }
  return content;
}
