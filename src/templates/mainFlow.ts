import { addKeyword, EVENTS } from "@builderbot/bot";
import { registerFlow } from "./registerFlow";
import sheetsService from "../services/sheetsService";
import { intentionFlow } from "./intentionFlow";

const mainFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
  const userExists = await sheetsService.userExists(ctx.from);

  if (!userExists) {
    return await ctxFn.gotoFlow(registerFlow);
  } else {
    await ctxFn.gotoFlow(intentionFlow);
  }
});

export { mainFlow };
