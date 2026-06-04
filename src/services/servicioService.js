import api from "../api/axios";

export const obtenerServiciosPorNegocio = async (idNegocio) => {

    const response = await api.get(
        `/servicios/negocio/${idNegocio}`
    );

    return response.data;
};

export const crearServicio = async (dto) => {
    const response = await api.post("/servicios", dto);
    return response.data;
};

export const editarServicio = async (id, dto) => {
    const response = await api.put(`/servicios/${id}`, dto);
    return response.data;
};

export const toggleServicio = async (id) => {
    const response = await api.put(`/servicios/${id}/toggle`);
    return response.data;
};