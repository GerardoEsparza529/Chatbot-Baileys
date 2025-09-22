import { addKeyword, EVENTS } from "@builderbot/bot";
import { chat } from "../services/chatgpt.js";

const gptFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        const response = await chat("eres un bot encargado de responder consultas", ctx.body);
        return ctxFn.endFlow(response);
    });

export { gptFlow };