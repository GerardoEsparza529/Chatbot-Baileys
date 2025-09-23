import { createBot } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot';
import templates from './templates/index.js';
import { providerMeta, providerBaileys } from './provider/index.js';
import { config } from './config/index.js';
import { aiService } from './services/aiService.js';

const PORT = config.PORT;

const main = async () => {
    try {
        console.log('🚀 Iniciando WhatsApp AI Bot...');
        
        // Validar configuración de WhatsApp provider
        if (!config.provider) {
            throw new Error('❌ PROVIDER no configurado en .env');
        }

        // Validar configuración de IA
        const aiInfo = aiService.getProviderInfo();
        console.log(`🤖 Proveedor de IA seleccionado: ${aiInfo.current.toUpperCase()}`);
        console.log(`📊 Modelo: ${aiInfo.model}`);
        
        if (!aiInfo.openai_available && !aiInfo.gemini_available) {
            throw new Error('❌ No hay proveedores de IA configurados. Configura OPENAI_APIKEY o GEMINI_APIKEY en .env');
        }

        if (aiInfo.current === 'openai' && !aiInfo.openai_available) {
            throw new Error('❌ OpenAI seleccionado pero OPENAI_APIKEY no configurado en .env');
        }

        if (aiInfo.current === 'gemini' && !aiInfo.gemini_available) {
            throw new Error('❌ Gemini seleccionado pero GEMINI_APIKEY no configurado en .env');
        }

        const adapterFlow = templates;
        let adapterProvider;
        
        if (config.provider === "meta") {
            console.log('📱 Configurando provider Meta...');
            if (!config.jwtToken || !config.numberId) {
                throw new Error('❌ Credenciales de Meta faltantes en .env');
            }
            adapterProvider = providerMeta;
        } else if (config.provider === "baileys") {
            console.log('📱 Configurando provider Baileys...');
            adapterProvider = providerBaileys;
        } else {
            throw new Error(`❌ Provider "${config.provider}" no válido. Usa "meta" o "baileys"`);
        }

        const adapterDB = new Database();

        console.log('🔧 Creando bot...');
        const { httpServer } = await createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        });

        console.log(`🌐 Servidor iniciado en puerto ${PORT}`);
        httpServer(+PORT);
        
        console.log('✅ Bot iniciado exitosamente');
        console.log(`💡 Configuración actual:`);
        console.log(`   - WhatsApp Provider: ${config.provider}`);
        console.log(`   - IA Provider: ${aiInfo.current}`);
        console.log(`   - Modelo: ${aiInfo.model}`);
        if (aiInfo.openai_available && aiInfo.gemini_available) {
            console.log(`   - Fallback disponible: ${aiInfo.current === 'openai' ? 'Gemini' : 'OpenAI'}`);
        }
        
    } catch (error) {
        console.error('❌ Error crítico al iniciar el bot:', error.message);
        process.exit(1);
    }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception thrown:', error);
    process.exit(1);
});

main();
