import api from "../api/axios";

export const obtenerTurnosNegocio = async (id, page = 0) => {
    const response = await api.get(`/admin/negocio/${id}?page=${page}`);
    return response.data;
};
