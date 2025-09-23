import "dotenv/config";

export const config = {
    // Agregar todas las variables de entorno
    PORT: process.env.PORT || 3008,
    provider: process.env.provider,
    
    // Meta
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v20.0",
    
    // AI Provider Configuration
    ai_provider: process.env.ai_provider || "openai", // "openai" or "gemini"
    
    // OpenAI
    openai_apikey: process.env.openai_apikey,
    openai_model: process.env.openai_model || "gpt-3.5-turbo",
    
    // Google Gemini
    gemini_apikey: process.env.gemini_apikey,
    gemini_model: process.env.gemini_model || "gemini-2.0-flash",
    
    // Backward compatibility
    model: process.env.model || process.env.openai_model || "gpt-3.5-turbo",
};
