#!/usr/bin/env node

/**
 * Script de prueba para validar Gemini 2.0 Flash
 * Ejecutar: node test-gemini-2.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

async function testGemini2() {
    console.log('🧪 Probando Gemini 2.0 Flash...\n');
    
    const apiKey = process.env.gemini_apikey;
    if (!apiKey) {
        console.error('❌ Error: No se encontró la API key de Gemini');
        console.log('💡 Asegúrate de tener gemini_apikey en tu archivo .env');
        process.exit(1);
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        console.log('⚡ Enviando mensaje de prueba...');
        
        const prompt = "Responde brevemente: ¿Cuáles son las mejoras principales de Gemini 2.0 Flash?";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ ¡Gemini 2.0 Flash está funcionando!\n');
        console.log('📝 Respuesta:');
        console.log(text);
        console.log('\n🎉 Test completado exitosamente');
        
    } catch (error) {
        console.error('❌ Error al probar Gemini 2.0:', error.message);
        
        if (error.message.includes('API_KEY_INVALID')) {
            console.log('💡 La API key parece inválida. Verifica tu configuración.');
        } else if (error.message.includes('model not found')) {
            console.log('💡 El modelo gemini-2.0-flash podría no estar disponible aún.');
            console.log('   Puedes intentar con gemini-1.5-flash mientras tanto.');
        }
    }
}

// Ejecutar test
testGemini2();