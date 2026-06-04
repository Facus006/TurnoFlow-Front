import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { reservarTurno } from "../services/turnoService";
import { getErrorMessage } from "../utils/errorHandler";

function ReservarTurno() {
    const { servicioId } = useParams();
    const navigate = useNavigate();
    const [fechaHora, setFechaHora] = useState("");
    const [comentario, setComentario] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dto = { servicioId, fechaHora, comentario };
            await reservarTurno(dto);
            alert("Turno reservado exitosamente");
            navigate("/mis-turnos");
        } catch (error) {
            setError(getErrorMessage(error, "No se pudo reservar el turno"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="page-header">
                <h1>Reservar turno</h1>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Fecha y hora</label>
                        <input
                            type="datetime-local"
                            value={fechaHora}
                            onChange={(e) => setFechaHora(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Comentario (opcional)</label>
                        <textarea
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Aclaraciones, consultas..."
                        />
                        {error && <p className="auth-error">{error}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}
                        style={{ width: "100%", justifyContent: "center" }}>
                        {loading ? "Reservando..." : "Confirmar reserva"}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default ReservarTurno;
