import { addKeyword, EVENTS } from "@builderbot/bot";

const menuFlow = addKeyword(EVENTS.ACTION).addAction(async (ctx, ctxFn) => {

    const listMessage = {
        text: "Select an option:",
        footer: "Choose one of the options below",
        title: "Main Menu",
        buttonText: "Options",
        sections: [
            {
                title: "Actions",
                rows: [
                    { title: "Option 1", description: "I want to listen to an audio", rowId: "GS0310971" },
                    { title: "Option 2", description: "I want to get an image", rowId: "GS0310972" },
                    { title: "Option 3", description: "I want to get a PDF", rowId: "GS0310973" }
                ]
            }
        ]
    }

    await ctxFn.provider.sendMessage(`${ctx.from}@s.whatsapp.net`, listMessage);
});

export { menuFlow };
