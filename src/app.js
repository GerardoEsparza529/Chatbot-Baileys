import { createBot } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot';
import templates from './templates/index.js';
import { providerMeta, providerBaileys } from './provider/index.js';
import { config } from './config/index.js';

const PORT = config.PORT;

const main = async () => {
    try {
        console.log('🚀 Iniciando WhatsApp AI Bot...');
        
        // Validar configuración crítica
        if (!config.openai_apikey) {
            throw new Error('❌ OPENAI_APIKEY no configurado en .env');
        }
        
        if (!config.provider) {
            throw new Error('❌ PROVIDER no configurado en .env');
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
