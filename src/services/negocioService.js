import api from "../api/axios";

export const obtenerNegocios = async () => {

    const response = await api.get("/negocios");

    return response.data;
};
export const crearNegocio = async (dto) => {
    const response = await api.post("/negocios", dto);
    return response.data;
};

export const editarNegocio = async (id, dto) => {
    const response = await api.put(`/negocios/${id}`, dto);
    return response.data;
};

export const obtenerMiNegocio = async () => {
    const response = await api.get("/negocios/mi-negocio");
    return response.data;
};

export const toggleNegocio = async (id) => {
    await api.put(`/negocios/${id}/toggle`);
};