import api from "../api/axios";

export const reservarTurno = async (dto) => {

    const response = await api.post("/turnos", dto);
    return response.data;
};

export const obtenerMisTurnos = async () => {
    const response = await api.get("/turnos/me");
    return response.data;
};
export const cancelarTurno = async (turnoId) => {
    const response = await api.put(`/turnos/cancelar/${turnoId}`);
};
export const confirmarTurno = async (turnoId) => {
    const response = await api.put(`/turnos/confirmar/${turnoId}`);
};
export const obtenerMisTurnosNegocio = async () => {
    const response = await api.get("/turnos/negocio");
    return response.data;
};
