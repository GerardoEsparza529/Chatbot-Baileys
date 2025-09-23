# WhatsApp AI Bot - Guía de Despliegue

## 🚀 Despliegue en Producción

### Prerrequisitos
- Node.js 20+ 
- Docker (opcional)
- API Key de OpenAI
- FFmpeg instalado (para procesamiento de audio)

### 🔧 Configuración

1. **Clonar repositorio**
```bash
git clone <tu-repositorio>
cd template_JS_basic-main
```

2. **Instalar dependencias**
```bash
npm install --production
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales reales
```

4. **Variables requeridas en .env:**
```env
provider=baileys
openai_apikey=TU_API_KEY_REAL_AQUI
model=gpt-3.5-turbo
PORT=3008
```

### 🐳 Despliegue con Docker

```bash
# Construir imagen
docker build -t whatsapp-bot .

# Ejecutar container
docker run -d \
  --name whatsapp-bot \
  -p 3008:3008 \
  --env-file .env \
  whatsapp-bot
```

### 🌐 Despliegue en VPS/Servidor

```bash
# Instalar PM2 para manejo de procesos
npm install -g pm2

# Iniciar aplicación
pm2 start src/app.js --name "whatsapp-bot"

# Configurar auto-restart
pm2 startup
pm2 save
```

### ☁️ Despliegue en la Nube

#### **Railway**
1. Conecta tu repositorio
2. Configura variables de entorno en el dashboard
3. Deploy automático

#### **Heroku**
```bash
heroku create tu-app-name
heroku config:set openai_apikey=TU_API_KEY
heroku config:set provider=baileys
heroku config:set model=gpt-3.5-turbo
git push heroku main
```

#### **DigitalOcean App Platform**
1. Conecta repositorio en el dashboard
2. Configura variables de entorno
3. Deploy automático

### 🔒 Seguridad

- ✅ Nunca commits archivos .env
- ✅ Rota API keys regularmente  
- ✅ Usa HTTPS en producción
- ✅ Configura firewall para puerto 3008
- ✅ Monitorea logs regularmente

### 📊 Monitoreo

```bash
# Ver logs en tiempo real
pm2 logs whatsapp-bot

# Ver estado
pm2 status

# Reiniciar si es necesario
pm2 restart whatsapp-bot
```

### 🐛 Solución de Problemas

1. **Bot no responde**: Verificar API key de OpenAI
2. **Error de audio**: Verificar que FFmpeg esté instalado
3. **Desconexión frecuente**: Verificar conexión a internet
4. **Errores de memoria**: Aumentar recursos del servidor

### 📱 Funcionalidades Disponibles

- ✅ Respuestas de texto inteligentes
- ✅ Procesamiento de notas de voz
- ✅ Detección de intenciones
- ✅ Soporte Baileys y Meta
- ✅ Conversión automática de audio