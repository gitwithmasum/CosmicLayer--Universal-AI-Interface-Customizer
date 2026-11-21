import type { PlatformAdapter } from "./base";
import { ChatGPTAdapter } from "./chatgpt";
import { ClaudeAdapter } from "./claude";
import { GeminiAdapter } from "./gemini";

export * from "./base";
export * from "./chatgpt";
export * from "./claude";
export * from "./gemini";

export const ADAPTERS: PlatformAdapter[] = [
  new ChatGPTAdapter(),
  new ClaudeAdapter(),
  new GeminiAdapter()
];

export function findMatchingAdapter(hostname: string): PlatformAdapter | null {
  for (const adapter of ADAPTERS) {
    if (adapter.matches(hostname)) {
      return adapter;
    }
  }
  return null;
}
