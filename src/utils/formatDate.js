export const formatFecha = (fechaHora) => {
    return new Date(fechaHora).toLocaleString("es-AR", {
        dateStyle: "medium",
        timeStyle: "short"
    });
};