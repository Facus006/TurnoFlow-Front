import api from "../api/axios";

export const obtenerUsuarios = async () => {
    const response = await api.get("/admin/usuario/all");
    return response.data;
};

export const toggleEstadoUsuario = async (id) => {
    const response = await api.put(`/admin/usuario/${id}/estado`);
    return response.data;
};

export const toggleRolAdmin = async (id) => {
    const response = await api.put(`/admin/usuario/${id}/rol`);
    return response.data;
};

export const setRolNegocio = async (id) => {
    const response = await api.put(`/admin/usuario/${id}/rol-negocio`);
    return response.data;
};

export const setRolUser = async (id) => {
    const response = await api.put(`/admin/negocio/${id}/rol-user`);
    return response.data;
};

export const eliminarUsuario = async (id) => {
    const response = await api.delete(`/admin/usuario/${id}`);
    return response.data;
};

export const editarUsuario = async (dto) => {
    const response = await api.put("/usuarios/editar", dto);
    return response.data;
};

export const editarPassword = async (dto) => {
    const response = await api.put("/usuarios/password", dto);
    return response.data;
};

export const editarEmail = async (dto) => {
    const response = await api.put("/usuarios/email", dto);
    return response.data;
};
