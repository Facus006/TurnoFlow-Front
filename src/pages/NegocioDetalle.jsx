import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { obtenerServiciosPorNegocio } from "../services/servicioService";

function NegocioDetalle() {
    const { id } = useParams();
    const [servicios, setServicios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const data = await obtenerServiciosPorNegocio(id);
                setServicios(data.content);
            } catch (error) {
                console.error(error);
            }
        };
        cargarServicios();
    }, [id]);

    return (
        <Layout>
            <div className="page-header">
                <h1>Servicios</h1>
                <button className="btn btn-outline" onClick={() => navigate("/negocios")}>
                    ← Volver
                </button>
            </div>

            {servicios.length === 0 ? (
                <div className="empty">
                    <p>Este negocio aún no tiene servicios.</p>
                </div>
            ) : (
                <div className="card-grid">
                    {servicios.map(servicio => (
                        <div key={servicio.id} className="card">
                            <h3>{servicio.nombre}</h3>
                            <p>{servicio.descripcion}</p>
                            <div className="card-footer">
                                <div className="card-meta">
                                    <span>${servicio.precio} · {servicio.duracionMinutos} min</span>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/reservar/${servicio.id}`)}
                                >
                                    Reservar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default NegocioDetalle;
