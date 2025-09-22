import { addKeyword, EVENTS } from '@builderbot/bot';

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
        return ctxFn.endFlow("Bienvenido a este chatbot!")
    })

export { welcomeFlow };