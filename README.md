<p align="center">
  <a href="https://aipaths.teachable.com/">
    <picture>
      <img src="https://builderbot.vercel.app/assets/thumbnail-vector.png" height="80">
    </picture>
    <h2 align="center">WhatsApp Bot Template</h2>
  </a>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@builderbot/bot">
    <img alt="" src="https://img.shields.io/npm/v/@builderbot/bot?color=%2300c200&label=%40bot-whatsapp">
  </a>
  <a aria-label="Join the community on Discord" href="https://discord.gg/9pB5pPbf2m">
    <img alt="" src="https://img.shields.io/discord/915193197645402142?logo=discord">
  </a>
</p>

## Introducción

Este template te proporciona la estructura básica para crear un chatbot de WhatsApp que puede vincularse tanto con Baileys (una librería de código abierto) como con la API oficial de Meta. La configuración es sencilla y flexible: solo necesitas especificar el provider en el archivo `.env` para alternar entre Baileys y Meta.

### Características

- **Integración con Providers de WhatsApp**: Cambia entre Baileys y Meta fácilmente en el archivo de configuración.
- **Plantilla Lista para Producción**: Proporciona una base estable y organizada para desarrollar flujos de conversación automatizados en WhatsApp.
- **Estructura Modular**: Diseñada para ampliar la funcionalidad del bot de manera rápida y escalable.

### Empezando

Para comenzar a usar este template, sigue los pasos a continuación:

1. **Clona el repositorio**
   - Clona el repo.

2. **Configura las Variables de Entorno**
   - Crea un archivo `.env` basado en el archivo `.env.example` que encontrarás en el proyecto.
   - En `provider=`, define `baileys` para usar Baileys o `meta` para utilizar la API oficial de Meta.

3. **Configuración de Meta API**:
   - Si seleccionas `meta` en el archivo `.env`, asegura que configures tus claves privadas y vincules el webhook correctamente para recibir mensajes.

4. **Configuración de Baileys**:
   - Si eliges `baileys`, simplemente ejecuta los comandos `pnpm install` y `pnpm run dev`.
   - Vincula el bot escaneando el código QR en WhatsApp desde la opción "Dispositivos vinculados".

5. **Prueba y Desarrollo**:
   - Envia mensajes de prueba desde otro número al bot para verificar que responde correctamente según el provider configurado.

## Curso Oficial

Si deseas profundizar en todas las funciones y configuraciones que puedes implementar con este template, consulta nuestro curso completo sobre creación de chatbots para WhatsApp:
[Ver Curso](https://aipaths.teachable.com/p/chatbot-whatsapp)

## Contáctanos

- [💻 Discord](https://discord.gg/9pB5pPbf2m) – Únete a nuestra comunidad.
- [📺 YouTube](https://www.youtube.com/channel/UCkk1guGQ6C6I4_XJ2Pa3SiA) – Mira nuestros tutoriales y contenido exclusivo.
- [🛒 Todos los Productos](https://aipaths.teachable.com/courses/) – Explora todos nuestros cursos y herramientas disponibles.