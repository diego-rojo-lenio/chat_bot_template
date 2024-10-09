import  {createFlowRouting } from "@builderbot-plugins/langchain"
import { EVENTS} from "@builderbot/bot";
import {config } from '../config';
import path from 'path';
import fs from 'fs';
import { faqFlow } from "./faqFlow";
import { menuFlow } from "./menuFlow";

const promptFile = path.join(
    process.cwd(),
    "assets/Prompts",
    "prompt_detection_es.txt"
)

const promptDetection = fs.readFileSync(promptFile, "utf-8")

export const intentionFlow = createFlowRouting.
setKeyword(EVENTS.ACTION).
setIntentions(
  {
    intentions: ["OPTION_MENU", "FAQ", "NOT_DETECTED"],
    description: promptDetection
  }  
).setAIModel({
    modelName: "openai" as any,
    args: {
        modelName: config.openai.model,
        apiKey: config.openai.key
    },
    
}).create({
    afterEnd(flow){
        return flow.addAction( async (ctx, {state, endFlow, gotoFlow}) => {
            try {
                const intention =await state.get("intention")
                console.log("Intention Detect ", intention)
                if (intention  == "NOT_DETECTED") {
                    return endFlow("I'm sorry, I didn't understand what you said, could you repeat it?")
                }

                if (intention == "FAQ") {
                    return await gotoFlow(faqFlow)
                }

                if (intention == "OPTION_MENU") {
                    return await gotoFlow(menuFlow)
                }
            }catch(error){
                console.log("Error: ", error)
                return endFlow("Error")
            }
    })}

})