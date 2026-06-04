import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerNegocios } from "../services/negocioService";
import { getErrorMessage } from "../utils/errorHandler";

function Negocios() {
    const [negocios, setNegocios] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarNegocios = async () => {
            try {
                const data = await obtenerNegocios();
                setNegocios(data.content);
            } catch (error) {
                setError(getErrorMessage(error, "No se pudieron cargar los negocios"));
            }
        };
        cargarNegocios();
    }, []);

    return (
        <Layout>
            <div className="page-header">
                <h1>Negocios</h1>
            </div>

            {error && <p className="auth-error">{error}</p>}

            {negocios.length === 0 ? (
                <div className="empty">
                    <p>No hay negocios disponibles.</p>
                </div>
            ) : (
                <div className="card-grid">
                    {negocios.map((negocio) => (
                        <div key={negocio.id} className="card">
                            <span className="badge">{negocio.categoria}</span>
                            <h3>{negocio.nombre}</h3>
                            <p>{negocio.descripcion}</p>
                            <p><strong>Dirección:</strong> {negocio.direccion}</p>
                            <p><strong>Teléfono:</strong> {negocio.telefono}</p>
                            <div className="card-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/negocios/${negocio.id}`)}
                                >
                                    Ver servicios →
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default Negocios;
