import OpenAI from "openai";
import { config } from "../config/index.js";
import fs from "fs";

const openaiApiKey = config.openai_apikey;

export const voice2text = async (filePath) => {
    if (!fs.existsSync(filePath)) {
        throw new Error("El archivo no existe en la ruta especificada.");
    }
    try {
        const openai = new OpenAI({ apiKey: openaiApiKey });
        const resp = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });
        return resp.text;
    } catch (error) {
        console.error("Error en la transcripción de voz:", error);
        throw new Error("No se pudo transcribir el audio.");
    }
}