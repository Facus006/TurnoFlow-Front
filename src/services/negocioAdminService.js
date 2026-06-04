import api from "../api/axios";

export const obtenerNegociosAdmin = async () => {
    const response = await api.get("/admin/negocios");
    return response.data;
};
