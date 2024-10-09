import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiService } from "../AiService";
import { config } from "../../config";

export class GoogleAIService implements AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.googleAi.googleApiKey);
  }

  async createChat(prompt: string, history: any[] = [], message: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: config.googleAi.googleGeminiModelId, systemInstruction: prompt }); 
     
        
      const chat = model.startChat({
        history: history.map(this.toGoogleMessage)
      })

      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.error("Error:", error);
      return "Error";
    }
  }

   toGoogleMessage(message: any): any {
    const role = message.role === "user" ? message.role : "model"
    return { parts:[ { text: message.content }], role: role }
   }

}