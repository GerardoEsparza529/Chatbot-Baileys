import { addKeyword, EVENTS } from "@builderbot/bot";
import { detectIntention } from "../services/intentionDetector.js";
import path from "path";
import fs from "fs";

import { gptFlow } from "./gptFlow.js";
import { welcomeFlow } from "./welcomeFlow.js";

// Cargar el prompt de detección
const Prompt_DETECTED = path.join(
  process.cwd(),
  "assets/prompts",
  "prompt_Detection.txt"
);
const promptDetected = fs.readFileSync(Prompt_DETECTED, "utf-8");

/**
 * Flujo de detección de intenciones personalizado
 * Alternativa compatible con Windows a @builderbot-plugins/langchain
 */
const DetectIntention = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { endFlow, gotoFlow }) => {
        try {
            console.log("🔍 Analizando mensaje:", ctx.body);
            
            // Detectar la intención usando nuestro servicio personalizado
            const intention = await detectIntention(ctx.body, promptDetected);
            
            console.log("🎯 INTENCIÓN DETECTADA:", intention);

            // Manejar las diferentes intenciones
            switch (intention) {
                case "NO_DETECTED":
                    return endFlow("Disculpa, tu mensaje está fuera de contexto. ¿Podrías reformularlo?");
                
                case "SALUDO":
                    return gotoFlow(welcomeFlow);
                
                case "FAQ":
                    return gotoFlow(gptFlow);
                
                default:
                    console.warn("⚠️ Intención desconocida:", intention);
                    return endFlow("Disculpa, no pude entender tu mensaje. ¿Podrías intentar de nuevo?");
            }

        } catch (error) {
            console.error("❌ Error en la detección de intención:", error);
            return endFlow("Ocurrió un error procesando tu mensaje. Por favor, inténtalo de nuevo.");
        }
    });

export { DetectIntention };