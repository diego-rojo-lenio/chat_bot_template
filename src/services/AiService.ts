export interface AiService {
  createChat(prompt: string, history: any[], message: string): Promise<string>;
}
