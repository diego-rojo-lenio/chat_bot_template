import { addKeyword } from "@builderbot/bot"
import path from "path"


const pathAudio = path.join(process.cwd(), "assets/Prompts", "audio.mp3")

const sendVoiceFlow = addKeyword("GS0310971").addAction(async (ctx, ctxFn) => {
    await ctxFn.provider.sendMedia(`${ctx.from}@whatsapp.net`, pathAudio) 
})

export { sendVoiceFlow }