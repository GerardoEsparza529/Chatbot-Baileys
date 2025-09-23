import { chat } from "./aiService.js";

/**
 * Servicio de detección de intenciones usando IA
 * Alternativa a @builderbot-plugins/langchain compatible con Windows
 * Ahora soporta OpenAI y Google Gemini
 */
export const detectIntention = async (userMessage, promptDetected) => {
  try {
    // Crear un prompt específico para detección de intenciones
    const systemPrompt = `${promptDetected}

IMPORTANTE: Debes responder ÚNICAMENTE con una de estas palabras exactas:
- SALUDO
- FAQ  
- NO_DETECTED

No agregues explicaciones ni texto adicional. Solo responde con la intención detectada.`;

    const response = await chat(systemPrompt, userMessage);
    
    // Limpiar la respuesta y asegurar que sea una intención válida
    const intention = response.trim().toUpperCase();
    
    // Validar que la respuesta sea una intención conocida
    const validIntentions = ["SALUDO", "FAQ", "NO_DETECTED"];
    
    if (validIntentions.includes(intention)) {
      return intention;
    }
    
    // Si no es una intención válida, devolver NO_DETECTED
    return "NO_DETECTED";
    
  } catch (error) {
    console.error("Error en detección de intención:", error);
    return "NO_DETECTED";
  }
};

/**
 * Crear un flujo de detección de intenciones personalizado
 * Replica la funcionalidad de createFlowRouting
 */
export const createIntentionFlow = (config) => {
  return {
    keyword: config.keyword,
    intentions: config.intentions,
    description: config.description,
    detectIntention,
  };
};