import { createFlow } from "@builderbot/bot"
import { mainFlow } from "./mainFlow"
import { faqFlow } from "./faqFlow"
import { registerFlow } from "./registerFlow"
import { menuFlow } from "./menuFlow"
import { sendImageFlow } from "./sendImageFlow"
import { sendVoiceFlow } from "./sendVoiceFlow"
import { sendPdfFlow } from "./sendPdfFlow"
import { intentionFlow } from "./intentionFlow"

export default createFlow([
    mainFlow,
    faqFlow,
    registerFlow,
    menuFlow,
    sendImageFlow,
    sendVoiceFlow,
    sendPdfFlow,
    intentionFlow 
])