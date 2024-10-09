import { addKeyword, EVENTS } from "@builderbot/bot";
import { GoogleAIService as AiService } from "~/services/Google/GoogleAiService"; 
import path from "path";
import fs, {stat} from "fs";
import sheetsService from "~/services/sheetsService";

const pathPrompt = path.join(
    process.cwd(),
    "assets/Prompts",
    "prompt_openai.txt"
)
const prompt = fs.readFileSync(pathPrompt, "utf-8")

export const faqFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, {state, endFlow, gotoFlow}) => {
    try{
        const Ai = new AiService()
        const history = await sheetsService.getUserConv(ctx.from)
        const response = await Ai.createChat(prompt, history, ctx.body)
        await sheetsService.addConvertToUser(ctx.from, [{ role: 'user', content: ctx.body }, { role: 'assistant', content: response }])
        return endFlow(response)
    }catch(error){
        console.log("OPEN AI response error: ", error)
        return endFlow("Error")
    }
})