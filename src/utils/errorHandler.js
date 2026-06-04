export const getErrorMessage = (error, fallback = "Ocurrió un error") => {
    const data = error.response?.data;
    if (typeof data === "object") {
        return Object.values(data).join(", ");
    }
    return fallback;
};