# 🤖 Sistema Dual de IA - OpenAI + Google Gemini

## 🌟 Nuevas Funcionalidades

Tu bot ahora soporta **dos proveedores de IA**:
- 🤖 **OpenAI** (GPT-3.5, GPT-4)
- 🧠 **Google Gemini** (Gemini-1.5-Flash, Gemini-Pro)

## 🔧 Configuración

### Variables de Entorno

```env
# Seleccionar proveedor de IA (openai o gemini)
ai_provider=openai

# Configuración OpenAI
openai_apikey=your_openai_api_key_here
openai_model=gpt-3.5-turbo

# Configuración Google Gemini
gemini_apikey=your_gemini_api_key_here
gemini_model=gemini-2.0-flash
```

### 📋 Modelos Disponibles

#### **OpenAI:**
- `gpt-3.5-turbo` (rápido y económico)
- `gpt-4` (más inteligente, más caro)
- `gpt-4-turbo` (balance perfecto)

#### **Google Gemini:**
- `gemini-2.0-flash` ⭐ **NUEVO** (más rápido y potente)
- `gemini-1.5-flash` (rápido y gratuito)
- `gemini-1.5-pro` (más potente)
- `gemini-pro` (versión estándar)

## 🚀 Uso

### Cambiar Proveedor de IA

1. **Edita tu archivo `.env`:**
```env
# Para usar OpenAI
ai_provider=openai

# Para usar Gemini
ai_provider=gemini
```

2. **Reinicia el bot**

### 🔄 Fallback Automático

Si un proveedor falla, el bot automáticamente intentará usar el otro proveedor (si está configurado).

### 🧪 Comandos de Prueba

Envía estos comandos al bot para probar:

- `/info` - Ver configuración actual de IA
- `/test` - Probar el proveedor actual
- `/switch` - Instrucciones para cambiar proveedor

## 💡 Ventajas de Cada Proveedor

### **OpenAI** 🤖
- ✅ Excelente comprensión de contexto
- ✅ Respuestas muy naturales
- ✅ Soporte completo para Whisper (voz)
- ❌ Requiere pago después del trial

### **Google Gemini** 🧠
- ✅ Cuota gratuita generosa
- ✅ Muy rápido (especialmente 2.0 Flash)
- ✅ Excelente para tareas específicas
- ✅ **Gemini 2.0 Flash**: Nueva generación más potente
- ❌ No tiene transcripción de voz (usa OpenAI Whisper)

## 🔧 Configuración Avanzada

### Usar Ambos Proveedores

```env
# Proveedor principal
ai_provider=gemini

# Configurar ambos para fallback automático
openai_apikey=your_openai_key
gemini_apikey=your_gemini_key
```

### Solo Notas de Voz

Si solo quieres usar el bot para transcripción de voz, necesitas OpenAI:

```env
ai_provider=openai
openai_apikey=your_openai_key
```

## 📊 Monitoreo

Los logs mostrarán qué proveedor se está usando:

```
🤖 Usando proveedor de IA: GEMINI
🔄 Intentando fallback a OPENAI...
```

## 🛠️ Solución de Problemas

### Error: "No hay proveedores de IA configurados"
- Configura al menos `openai_apikey` o `gemini_apikey`

### Error: "Gemini seleccionado pero GEMINI_APIKEY no configurado"
- Agrega tu API key de Google en `gemini_apikey`

### Notas de voz no funcionan
- Las notas de voz requieren OpenAI (Whisper)
- Configura `openai_apikey` aunque uses Gemini para texto

## 🔑 Obtener API Keys

### **OpenAI:**
1. Ve a https://platform.openai.com/api-keys
2. Crea una nueva API key
3. Agrega créditos a tu cuenta

### **Google Gemini:**
1. Ve a https://aistudio.google.com/app/apikey
2. Crea una nueva API key
3. ¡Es gratis hasta 15 RPM!

## 💰 Costos Aproximados

### **OpenAI (GPT-3.5-turbo):**
- ~$0.002 por 1000 tokens
- ~$0.01 por conversación promedio

### **Google Gemini:**
- Gratuito hasta 15 peticiones por minuto
- Muy económico en planes pagos

## 🎯 Recomendaciones

### **Para Desarrollo:**
```env
ai_provider=gemini  # Gratuito y rápido
```

### **Para Producción:**
```env
ai_provider=openai  # Más confiable y con Whisper
```

### **Para Máxima Disponibilidad:**
```env
ai_provider=gemini
# Configura ambas API keys para fallback
```