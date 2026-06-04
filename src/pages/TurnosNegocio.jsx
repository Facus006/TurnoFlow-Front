import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { obtenerMisTurnosNegocio, cancelarTurno } from "../services/turnoService";
import { getErrorMessage } from "../utils/errorHandler";
import { confirmarTurno } from "../services/turnoService";
import { formatFecha } from "../utils/formatDate";

function TurnosNegocio() {
    const [turnos, setTurnos] = useState([]);
    const [error, setError] = useState(null);
    

    const cargarTurnos = async () => {
        try {
            const data = await obtenerMisTurnosNegocio();
            setTurnos(data.content);
        } catch (error) {
            setError(getErrorMessage(error, "No se pudieron cargar los turnos"));
        }
    };

    const handleCancelar = async (id) => {
        try {
            await cancelarTurno(id);
            await cargarTurnos();
        } catch (error) {
            setError(getErrorMessage(error, "No se pudo cancelar el turno"));
        }
    };
    const handleConfirmar = async (id) => {
        try {
            await confirmarTurno(id);
            await cargarTurnos();
        } catch (error) {
            setError(getErrorMessage(error, "No se pudo confirmar el turno"));
        }
    };

    useEffect(() => { cargarTurnos(); }, []);

    return (
        <Layout>
            <div className="page-header">
                <h1>Turnos del Negocio</h1>
            </div>

            {turnos.length === 0 ? (
                <div className="empty">
                    <p>No hay turnos registrados.</p>
                </div>
            ) : (
                <div className="turno-list">
                    {turnos.map(turno => (
                        <div key={turno.id} className="turno-card">
                            <div className="turno-info">
                                <h3>{turno.negocioNombre}</h3>
                                <p>{turno.servicioNombre}</p>
                                <p>{formatFecha(turno.fechaHora)}</p>
                                {turno.comentario && <p>{turno.comentario}</p>}
                            </div>

                            <span className={`estado estado-${turno.estado}`}>
                                {turno.estado}
                            </span>

                            {turno.estado === "PENDIENTE" && (
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleConfirmar(turno.id)}
                                >
                                    Confirmar
                                </button>
                            )}

                            {["PENDIENTE", "CONFIRMADO"].includes(turno.estado) && (
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleCancelar(turno.id)}
                                >
                                    Cancelar
                                </button>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default TurnosNegocio;
