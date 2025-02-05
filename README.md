
# 🕒 App de Calendario

## 🔧 Requisitos Previos
Para ejecutar este proyecto necesitas:
- ♻ Tener instalado **Node.js** en tu sistema.

## 🚀 Instrucciones para Ejecutar

1. Clona este repositorio en tu computadora.
2. Abre una terminal y navega a la carpeta del proyecto:
   ```cmd
   cd ./calendario-mern
   ```
3. Instala las dependencias necesarias:
   ```cmd
   npm install
   ```
4. Ejecuta el proyecto:
   ```cmd
   npm run server
   ```

## 📄 Descripción del Proyecto

- **json-server**: Administra una API local y almacena los datos en un archivo JSON.
- **Vite**: Se encarga de levantar el proyecto de React para el front-end.
- **npm run server**: Ejecuta el front-end de React y el back-end local de manera simultánea.

Con estos pasos, tendrás la aplicación funcionando correctamente. Puedes acceder al front-end y realizar operaciones con el calendario que se conectan al back-end local.

---

🌟 **!**
# Arquitectura del Proyecto

## 📌 Tecnologías
- Frontend: React
- Backend: Node.js + Express
- Base de Datos: MongoDB

## 🏗️ Arquitectura
1. **Cliente**: React envía solicitudes HTTP al backend.
2. **Servidor**: Express maneja la lógica de negocio.
3. **Base de Datos**: MongoDB almacena los datos.

## 🔄 Flujo de Datos
1. El usuario interactúa con el frontend.
2. El frontend hace peticiones a la API.
3. La API valida y responde con datos de la BD.
