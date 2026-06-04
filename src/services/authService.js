import api from "../api/axios";

export const register = async (nombre, apellido, email, password, password2) => {
    const response = await api.post("/auth/registro", {
        nombre,
        apellido,
        email,
        password,
        password2
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password
    });

    return response.data;
};

export const logout = async (refreshToken) => {
    await api.post("/auth/logout", { refreshToken });
};