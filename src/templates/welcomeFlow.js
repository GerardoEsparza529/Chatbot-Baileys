import { addKeyword, EVENTS } from '@builderbot/bot';

const welcomeFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        return ctxFn.endFlow("¡Hola! ¿En qué puedo ayudarte hoy?");
    });

export { welcomeFlow };