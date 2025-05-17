import { Tables } from "@/supabase/types"
import { ChatMessage, LLMID } from "."

export interface ChatSettings_old {
  model: LLMID
  prompt: string
  temperature: number
  contextLength: number
  includeProfileContext: boolean
  includeWorkspaceInstructions: boolean
  embeddingsProvider: "openai" | "local"
}
export interface ChatSettings {
  model: LLMID
  prompt: string
  temperature: number
  /** Максимальное число вход+выход токенов для GPT-семейства */
  contextLength: number
  /**
   * Явно ограничить длину выхода для GPT-семейства
   * (используется в параметре max_tokens)
   */
  maxTokens?: number
  /**
   * Явно ограничить длину выхода для “o”-моделей
   * (используется в параметре max_completion_tokens)
   */
  maxCompletionTokens?: number

  includeProfileContext: boolean
  includeWorkspaceInstructions: boolean
  embeddingsProvider: "openai" | "local"
}

export interface ChatPayload {
  chatSettings: ChatSettings
  workspaceInstructions: string
  chatMessages: ChatMessage[]
  assistant: Tables<"assistants"> | null
  messageFileItems: Tables<"file_items">[]
  chatFileItems: Tables<"file_items">[]
}

export interface ChatAPIPayload {
  chatSettings: ChatSettings
  messages: Tables<"messages">[]
}
