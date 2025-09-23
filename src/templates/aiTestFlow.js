import { addKeyword } from "@builderbot/bot";
import { aiService } from "../services/aiService.js";

/**
 * Flujo para testear la configuración de IA
 * Comandos: /test, /info, /switch
 */
const aiTestFlow = addKeyword(["/test", "/info", "/switch"])
    .addAction(async (ctx, { endFlow }) => {
        try {
            const command = ctx.body.toLowerCase();
            
            if (command === "/info") {
                const info = aiService.getProviderInfo();
                
                let response = `🤖 **Información de IA**\n\n`;
                response += `📍 **Proveedor actual:** ${info.current.toUpperCase()}\n`;
                response += `🔧 **Modelo:** ${info.model}\n\n`;
                response += `**Proveedores disponibles:**\n`;
                response += `${info.openai_available ? '✅' : '❌'} OpenAI\n`;
                response += `${info.gemini_available ? '✅' : '❌'} Google Gemini\n\n`;
                
                if (info.openai_available && info.gemini_available) {
                    response += `💡 **Tip:** Usa /switch para probar el otro proveedor`;
                }
                
                return endFlow(response);
            }
            
            if (command === "/test") {
                const testQuestion = "Responde con exactamente 3 palabras que confirmen que estás funcionando";
                const response = await aiService.chat("Eres un asistente de prueba", testQuestion);
                
                const info = aiService.getProviderInfo();
                return endFlow(`🧪 **Test de IA**\n\n🤖 **Proveedor:** ${info.current.toUpperCase()}\n📝 **Respuesta:** ${response}`);
            }
            
            if (command === "/switch") {
                return endFlow(`🔄 **Cambio de Proveedor**\n\nPara cambiar el proveedor de IA, modifica la variable \`ai_provider\` en tu archivo .env:\n\n• \`ai_provider=openai\` para OpenAI\n• \`ai_provider=gemini\` para Google Gemini\n\nLuego reinicia el bot.`);
            }
            
        } catch (error) {
            console.error("❌ Error en aiTestFlow:", error);
            return endFlow(`❌ **Error de prueba**\n\n${error.message}`);
        }
    });

export { aiTestFlow };