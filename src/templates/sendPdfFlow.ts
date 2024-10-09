import { addKeyword, EVENTS } from "@builderbot/bot"

const sendPdfFlow = addKeyword("GS0310973").addAnswer("PDF copy", {media: './assets/sample.pdf'})

export { sendPdfFlow }