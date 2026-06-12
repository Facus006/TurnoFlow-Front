# TurnoFlow — Frontend

Frontend del sistema de gestión de turnos [TurnoFlow](https://github.com/Facus006/TurnoFlow), desarrollado con React y Vite.

---

## 🛠 Tecnologías

- React + Vite
- React Router DOM
- Axios
- CSS puro

---

## 🌐 Demo
[Ver aplicación en vivo:] https://turno-flow-front.vercel.app/

Backend: https://turnoflow-production.up.railway.app/swagger-ui/index.html#/


## ⚙️ Requisitos previos

- Node.js 18+
- Backend de TurnoFlow corriendo en `http://localhost:8080`

---

## 🚀 Instalación

Opción 1: Desarrollo local (sin Docker)

```bash
git clone https://github.com/Facus006/TurnoFlow-Front.git
cd TurnoFlow-Front
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`

---

Opción 2: Con Docker (recomendado si usás backend dockerizado)

👉 Primero asegurate de tener corriendo el backend:

```bash
cd TurnoFlow
docker compose up --build
```

Luego el frontend:

```bash
cd TurnoFlow-Front
docker compose up --build
```

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



## 📸 Screenshots

### Login
![Login](https://github.com/user-attachments/assets/63c3463d-f539-4f30-95bb-6e0e30ab8ffa)

### Negocios
![Negocios](https://github.com/user-attachments/assets/21c94f8f-b866-446e-9df3-243c105bc606)

### Mi Negocio
![Mi Negocio](https://github.com/user-attachments/assets/4f0718d1-cba4-47ff-a8ef-e006892fa15e)

### Turnos del Negocio
![Turnos del Negocio](https://github.com/user-attachments/assets/8100835a-0738-4f4b-b1c1-37cf87e2c2ea)

### Panel de Administración
![Panel de Administración](https://github.com/user-attachments/assets/f2792af4-13f0-479a-b1d7-e5f58dc33b2b)
