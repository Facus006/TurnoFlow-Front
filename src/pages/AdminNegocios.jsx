import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerNegociosAdmin } from "../services/negocioAdminService";
import { getErrorMessage } from "../utils/errorHandler";

function AdminNegocios() {
    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await obtenerNegociosAdmin();
                setNegocios(data.content);
            } catch (error) {
                setError(getErrorMessage(error, "Error al cargar negocios"));
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    return (
        <Layout>
            <div className="page-header">
                <h1>Negocios</h1>
                <button className="btn btn-outline" onClick={() => navigate("/admin")}>
                    ← Volver
                </button>
            </div>

            {error && <p className="auth-error" style={{ marginBottom: "1rem" }}>{error}</p>}

            {loading ? (
                <div className="empty"><p>Cargando negocios...</p></div>
            ) : negocios.length === 0 ? (
                <div className="empty"><p>No hay negocios registrados.</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Negocio</th>
                                <th>Categoría</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Propietario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {negocios.map(negocio => (
                                <tr key={negocio.id}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">
                                                {negocio.nombre?.[0]}
                                            </div>
                                            <div>
                                                <span>{negocio.nombre}</span>
                                                <p style={{ fontSize: "0.78rem", color: "var(--muted)", margin: 0 }}>
                                                    {negocio.descripcion}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge">{negocio.categoria}</span>
                                    </td>
                                    <td className="cell-muted">{negocio.direccion}</td>
                                    <td className="cell-muted">{negocio.telefono}</td>
                                    <td className="cell-muted">{negocio.propietarioNombre}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => navigate(`/admin/negocio/${negocio.id}/turnos`)}
                                        >
                                            Ver turnos
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Layout>
    );
}

export default AdminNegocios;
