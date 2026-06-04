# TurnoFlow — Frontend

Frontend del sistema de gestión de turnos [TurnoFlow](https://github.com/Facus006/TurnoFlow), desarrollado con React y Vite.

---

## 🛠 Tecnologías

- React + Vite
- React Router DOM
- Axios
- CSS puro

---

## ⚙️ Requisitos previos

- Node.js 18+
- Backend de TurnoFlow corriendo en `http://localhost:8080`

---

## 🚀 Instalación

```bash
git clone https://github.com/Facus006/TurnoFlow-Front.git
cd TurnoFlow-Front
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`

---

## 👥 Funcionalidades por rol

### USER
- Registro y login
- Ver negocios y reservar turnos
- Consultar y cancelar mis turnos
- Editar perfil, contraseña y email

### NEGOCIO
- Crear y editar su negocio
- Gestionar servicios (crear, editar, activar/desactivar)
- Ver, confirmar, rechazar y completar turnos

### ADMIN
- Gestión completa de usuarios (roles, estado, eliminación)
- Ver turnos de cualquier negocio

---

## 🔐 Autenticación

JWT con refresh token automático. Cuando el access token expira se renueva de forma transparente sin interrumpir al usuario.

---

## 🔗 Repositorio backend

[TurnoFlow — API REST](https://github.com/Facus006/TurnoFlow)
