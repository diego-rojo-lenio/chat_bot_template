import OpenAi from "openai";
import { config } from "../../config";
import { AiService } from "../AiService";

export class OpenAiService implements AiService {
  private openAI: OpenAi;

  constructor() {
    this.openAI = new OpenAi({ apiKey: config.openai.key });
  }

  async createChat(
    prompt: string,
    history: any[],
    message: string
  ): Promise<string> {
    try {
      const messages = [
        { role: "system", content: prompt },
        ...history,
        { role: "user", content: message },
      ];
      const completion = await this.openAI.chat.completions.create({
        model: config.openai.model,
        messages: messages,
      });
      const answer = completion.choices[0].message?.content || "No response";
      return answer;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
}
