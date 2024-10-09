import { addKeyword, EVENTS } from "@builderbot/bot";
import sheetsService from "~/services/sheetsService";
const emailRegex = /\S+@\S+\.\S+/
const registerFlow = addKeyword(EVENTS.ACTION)


.addAnswer(`Do you want to register ?`, { capture: true, buttons: [{body:" Yes I want" }, {body: "No, thanks"}] },
     async (ctx,  ctxFn ) => {
        if (ctx.body.toLocaleLowerCase().includes('no')) {
            return ctxFn.endFlow("Thanks for your time!")
        }else if (ctx.body.toLocaleLowerCase().includes('yes')) {
            await ctxFn.flowDynamic("Perfect! I will ask you some questions to register you.")
        }else{
            return ctxFn.fallBack("I'm sorry, I didn't understand that.")
        }
    })
.addAnswer(`What is your name?`, { capture: true },  async (ctx,  ctxFn ) => {
    await ctxFn.flowDynamic(`Great! ${ctx.body}!`)
    await ctxFn.state.update({ name: ctx.body })
})
.addAnswer('What is your email?', { capture: true }, async (ctx,  ctxFn ) => {
    if (!emailRegex.test(ctx.body)) {
        return ctxFn.fallBack('Please, enter a valid email.')
    }
    const currentState = await ctxFn.state.getMyState()
    await sheetsService.createUser(ctx.from, currentState.name, ctx.body)
    await ctxFn.state.update({ email: ctx.body })
})

export { registerFlow };