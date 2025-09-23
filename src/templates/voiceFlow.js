import { addKeyword, EVENTS } from "@builderbot/bot";
import {downloadFile, downloadFileBaileys} from "../utils/downloader.js";
import { config } from "../config/index.js";
import { voice2text, chat } from "../services/aiService.js";
import { removeFile } from "../utils/remover.js";

const voiceFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAction(async (ctx, ctxFn) => {
        try {
            console.log("🎵 Procesando nota de voz...");
            
            let filePath;
            if (config.provider === "meta") {
                console.log("📥 Descargando audio desde Meta...");
                filePath = await downloadFile(ctx.url, config.jwtToken);
            } else if (config.provider === "baileys") {
                console.log("📥 Descargando audio desde Baileys...");
                filePath = await downloadFileBaileys(ctx);
            } else {
                return ctxFn.endFlow("❌ Proveedor no soportado para notas de voz.");
            }

            console.log("🔍 Transcribiendo audio...");
            const transcript = await voice2text(filePath.filePath);
            console.log("📝 Transcripción:", transcript);

            console.log("🤖 Generando respuesta...");
            const response = await chat("Eres un bot encargado de responder consultas", transcript);
            
            // Limpiar archivos temporales
            console.log("🧹 Limpiando archivos temporales...");
            await removeFile(filePath.filePath);
            if (filePath.fileOldPath && filePath.fileOldPath !== filePath.filePath) {
                await removeFile(filePath.fileOldPath);
            }
            
            console.log("✅ Procesamiento de voz completado");
            return ctxFn.endFlow(response);
            
        } catch (error) {
            console.error("❌ Error procesando nota de voz:", error);
            return ctxFn.endFlow("Disculpa, hubo un error procesando tu nota de voz. Inténtalo de nuevo.");
        }
    })

export { voiceFlow };