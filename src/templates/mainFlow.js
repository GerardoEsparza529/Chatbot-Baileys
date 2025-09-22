import { addKeyword, EVENTS } from "@builderbot/bot";
import {DetectIntention} from "./intentiosFlow.js";

const mainFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
        return ctxFn.gotoFlow(DetectIntention);
    });

export { mainFlow };