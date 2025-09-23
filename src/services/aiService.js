import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/index.js";

/**
 * Servicio unificado de IA que soporta OpenAI y Google Gemini
 * Permite alternar entre proveedores desde variables de entorno
 */

class AIService {
    constructor() {
        this.provider = config.ai_provider?.toLowerCase() || "openai";
        this.initializeProviders();
    }

    initializeProviders() {
        // Inicializar OpenAI si está configurado
        if (config.openai_apikey) {
            this.openai = new OpenAI({ 
                apiKey: config.openai_apikey 
            });
        }

        // Inicializar Gemini si está configurado
        if (config.gemini_apikey) {
            this.gemini = new GoogleGenerativeAI(config.gemini_apikey);
        }
    }

    /**
     * Método principal para hacer chat con IA
     * @param {string} prompt - Prompt del sistema
     * @param {string} question - Pregunta del usuario
     * @returns {Promise<string>} Respuesta de la IA
     */
    async chat(prompt, question) {
        try {
            console.log(`🤖 Usando proveedor de IA: ${this.provider.toUpperCase()}`);

            if (this.provider === "gemini") {
                return await this.chatWithGemini(prompt, question);
            } else if (this.provider === "openai") {
                return await this.chatWithOpenAI(prompt, question);
            } else {
                throw new Error(`Proveedor de IA no soportado: ${this.provider}`);
            }
        } catch (error) {
            console.error(`❌ Error con ${this.provider}:`, error.message);
            
            // Fallback: intentar con el otro proveedor si está disponible
            return await this.fallbackChat(prompt, question);
        }
    }

    /**
     * Chat usando OpenAI
     */
    async chatWithOpenAI(prompt, question) {
        if (!this.openai) {
            throw new Error("OpenAI no está configurado. Verifica OPENAI_APIKEY.");
        }

        const completion = await this.openai.chat.completions.create({
            model: config.openai_model,
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                {
                    role: "user",
                    content: question,
                },
            ],
        });

        return completion.choices[0].message.content;
    }

    /**
     * Chat usando Google Gemini
     */
    async chatWithGemini(prompt, question) {
        if (!this.gemini) {
            throw new Error("Gemini no está configurado. Verifica GEMINI_APIKEY.");
        }

        const model = this.gemini.getGenerativeModel({ 
            model: config.gemini_model 
        });

        // Combinar prompt del sistema con la pregunta
        const fullPrompt = `${prompt}\n\nUsuario: ${question}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        
        return response.text();
    }

    /**
     * Fallback a otro proveedor en caso de error
     */
    async fallbackChat(prompt, question) {
        const fallbackProvider = this.provider === "openai" ? "gemini" : "openai";
        
        console.log(`🔄 Intentando fallback a ${fallbackProvider.toUpperCase()}...`);

        try {
            if (fallbackProvider === "gemini" && this.gemini) {
                return await this.chatWithGemini(prompt, question);
            } else if (fallbackProvider === "openai" && this.openai) {
                return await this.chatWithOpenAI(prompt, question);
            }
        } catch (fallbackError) {
            console.error(`❌ Fallback también falló:`, fallbackError.message);
        }

        throw new Error("No se pudo obtener respuesta de ningún proveedor de IA.");
    }

    /**
     * Método específico para transcripción de voz (solo OpenAI Whisper)
     */
    async voice2text(filePath) {
        if (!this.openai) {
            throw new Error("OpenAI no está configurado. Whisper requiere OpenAI API key.");
        }

        console.log("🎤 Transcribiendo con Whisper...");

        const fs = await import('fs');
        const response = await this.openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });

        return response.text;
    }

    /**
     * Obtener información del proveedor actual
     */
    getProviderInfo() {
        return {
            current: this.provider,
            openai_available: !!this.openai,
            gemini_available: !!this.gemini,
            model: this.provider === "openai" ? config.openai_model : config.gemini_model
        };
    }
}

// Exportar instancia singleton
const aiService = new AIService();

// Exportar funciones compatibles hacia atrás
export const chat = (prompt, question) => aiService.chat(prompt, question);
export const voice2text = (filePath) => aiService.voice2text(filePath);

// Exportar el servicio completo
export { aiService };
export default aiService;