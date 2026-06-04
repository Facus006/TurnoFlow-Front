TurnoFlow - Frontend
Frontend de TurnoFlow, sistema de gestión de turnos. Desarrollado con React y Vite.
Tecnologías:

React · Vite · Axios · React Router DOM · CSS puro.

Requisitos previos:

Node.js 18+
El backend de TurnoFlow corriendo en http://localhost:8080.


Cómo levantar el proyecto:


# 1. Clonar el repositorio
git clone https://github.com/Facus006/TurnoFlow-Front.git
cd TurnoFlow-Front

# 2. Instalar dependencias
npm install

# 3. Correr la aplicación
npm run dev
La app queda disponible en http://localhost:5173

# Funcionalidades por rol
USER

Registro y login
Ver negocios y sus servicios
Reservar, consultar y cancelar turnos
Editar perfil, contraseña y email

NEGOCIO

Crear y editar su negocio
Gestionar servicios (crear, editar, activar/desactivar)
Ver, confirmar, rechazar y completar turnos

ADMIN

Gestión completa de usuarios (roles, estado, eliminación)
Ver turnos de cualquier negocio

Autenticación
Usa JWT con refresh token automático. Cuando el access token expira, se renueva de forma transparente sin interrumpir al usuario.
