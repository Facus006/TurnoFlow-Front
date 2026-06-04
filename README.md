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



## 📸 Screenshots

### Login
![Login](https://github.com/user-attachments/assets/0c1f8b4a-b9c2-4213-a6d7-af9ce1b3c878)

### Negocios
![Negocios](https://github.com/user-attachments/assets/de0391a2-0d97-43f1-bedc-35cb6ca14cfc)

### Mi Negocio
![Mi Negocio](https://github.com/user-attachments/assets/44323145-2ad4-419b-a384-b25639e4a94d)

### Turnos del Negocio
![Turnos](https://github.com/user-attachments/assets/c691e495-150b-4d97-b14e-58679aab6a61)

### Panel de Administración
![Admin](https://github.com/user-attachments/assets/88b57112-4e53-45af-8c9f-3b4eb6b44a9a)
