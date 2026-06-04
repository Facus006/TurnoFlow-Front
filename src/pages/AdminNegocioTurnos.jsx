import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerTurnosNegocio } from "../services/turnoAdminService";
import { formatFecha } from "../utils/formatDate";

function AdminNegocioTurnos() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nombreNegocio, setNombreNegocio] = useState("");

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await obtenerTurnosNegocio(id);
                setTurnos(data.content);
                if (data.content.length > 0) {
                    setNombreNegocio(data.content[0].negocioNombre);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]);

    return (
        <Layout>
            <div className="page-header">
                <h1>Turnos {nombreNegocio ? `— ${nombreNegocio}` : ""}</h1>
                <button className="btn btn-outline" onClick={() => navigate("/admin")}>
                    ← Volver
                </button>
            </div>

            {loading ? (
                <div className="empty"><p>Cargando turnos...</p></div>
            ) : turnos.length === 0 ? (
                <div className="empty"><p>Este negocio no tiene turnos registrados.</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Servicio</th>
                                <th>Fecha y hora</th>
                                <th>Estado</th>
                                <th>Comentario</th>
                                <th>Propietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.map(turno => (
                                <tr key={turno.id}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">
                                                {turno.clienteNombre?.[0]}
                                            </div>
                                            <span>{turno.clienteNombre}</span>
                                        </div>
                                    </td>
                                    <td>{turno.servicioNombre}</td>
                                    <td className="cell-muted">{formatFecha(turno.fechaHora)}</td>
                                    <td>
                                        <span className={`estado estado-${turno.estado}`}>
                                            {turno.estado}
                                        </span>
                                    </td>
                                    <td className="cell-muted">{turno.comentario || "—"}</td>
                                    <td className="cell-muted">{turno.negocioNombre || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Layout>
    );
}

export default AdminNegocioTurnos;
