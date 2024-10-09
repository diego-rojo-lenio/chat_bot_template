import { addKeyword, EVENTS } from "@builderbot/bot"

const sendImageFlow = addKeyword("GS0310972").addAnswer("Image copy", {media: './assets/sample.png'})

export { sendImageFlow }