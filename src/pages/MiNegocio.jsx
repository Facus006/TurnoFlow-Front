import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { obtenerMiNegocio, crearNegocio, editarNegocio, toggleNegocio } from "../services/negocioService";
import { crearServicio, editarServicio, toggleServicio } from "../services/servicioService";
import { obtenerServiciosPorNegocio } from "../services/servicioService";
import { getErrorMessage } from "../utils/errorHandler";

const negocioVacio = { nombre: "", descripcion: "", categoria: "", direccion: "", telefono: "" };
const servicioVacio = { nombre: "", descripcion: "", precio: "", duracionMinutos: "" };

function MiNegocio() {

    const [negocio, setNegocio] = useState(null);
    const [servicios, setServicios] = useState([]);
    const [negocioForm, setNegocioForm] = useState(negocioVacio);
    const [servicioForm, setServicioForm] = useState(servicioVacio);
    const [editandoServicio, setEditandoServicio] = useState(null);

    const [mensajeNegocio, setMensajeNegocio] = useState(null);
    const [mensajeServicio, setMensajeServicio] = useState(null);
    const [errorNegocio, setErrorNegocio] = useState(null);
    const [errorServicio, setErrorServicio] = useState(null);

    const cargarNegocio = async () => {
        try {
            const data = await obtenerMiNegocio();
            setNegocio(data);
            setNegocioForm({
                nombre: data.nombre,
                descripcion: data.descripcion,
                categoria: data.categoria,
                direccion: data.direccion,
                telefono: data.telefono
            });
        } catch {
            setNegocio(null);
        }
    };

    const cargarServicios = async (negocioId) => {
        try {
            const data = await obtenerServiciosPorNegocio(negocioId);
            setServicios(data.content);
        } catch (error) {
            setErrorServicio(getErrorMessage(error, "Error al cargar servicios"));
        }
    };

    useEffect(() => {
        cargarNegocio();
    }, []);

    useEffect(() => {
        if (negocio?.id) cargarServicios(negocio.id);
    }, [negocio]);

    const handleNegocio = async (e) => {
        e.preventDefault();
        setErrorNegocio(null);
        setMensajeNegocio(null);
        try {
            if (negocio) {
                await editarNegocio(negocio.id, negocioForm);
                setMensajeNegocio("Negocio actualizado correctamente");
            } else {
                await crearNegocio(negocioForm);
                setMensajeNegocio("Negocio creado correctamente");
            }
            await cargarNegocio();
        } catch (error) {
            setErrorNegocio(getErrorMessage(error, "Error al guardar negocio"));
        }
    };

    const handleServicio = async (e) => {
        e.preventDefault();
        setErrorServicio(null);
        setMensajeServicio(null);
        try {
            if (editandoServicio) {
                await editarServicio(editandoServicio, servicioForm);
                setMensajeServicio("Servicio actualizado correctamente");
            } else {
                await crearServicio(servicioForm);
                setMensajeServicio("Servicio creado correctamente");
            }
            setServicioForm(servicioVacio);
            setEditandoServicio(null);
            await cargarServicios(negocio.id);
        } catch (error) {
            setErrorServicio(getErrorMessage(error, "Error al guardar servicio"));
        }
    };

    const handleToggleServicio = async (id) => {
        try {
            await toggleServicio(id);
            await cargarServicios(negocio.id);
        } catch (error) {
            setErrorServicio(getErrorMessage(error, "Error al cambiar estado del servicio"));
        }
    };

    const handleEditarServicio = (servicio) => {
        setEditandoServicio(servicio.id);
        setServicioForm({
            nombre: servicio.nombre,
            descripcion: servicio.descripcion,
            precio: servicio.precio,
            duracionMinutos: servicio.duracionMinutos
        });
        setMensajeServicio(null);
        setErrorServicio(null);
    };

    const handleCancelarEdicion = () => {
        setEditandoServicio(null);
        setServicioForm(servicioVacio);
        setMensajeServicio(null);
        setErrorServicio(null);
    };

    const handleToggleNegocio = async () => {
        try {
            await toggleNegocio(negocio.id);
            await cargarNegocio();
        } catch (error) {
            setErrorNegocio(getErrorMessage(error, "Error al cambiar estado del negocio"));
        }
    };

    return (
        <Layout>
            <div className="page-header">
                <h1>Mi Negocio</h1>
                {negocio && (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span className={`estado ${negocio.activo ? "estado-CONFIRMADO" : "estado-CANCELADO"}`}>
                            {negocio.activo ? "Activo" : "Inactivo"}
                        </span>
                        <button
                            className={`btn ${negocio.activo ? "btn-danger" : "btn-success"}`}

                            onClick={handleToggleNegocio}
                        >
                            {negocio.activo ? "Desactivar negocio" : "Activar negocio"}
                        </button>
                    </div>
                )}
            </div>

            {/* Formulario negocio */}
            <div className="form-card" style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1.25rem" }}>
                    {negocio ? "Editar negocio" : "Crear negocio"}
                </h3>
                <form onSubmit={handleNegocio}>
                    {["nombre", "descripcion", "categoria", "direccion", "telefono"].map((campo) => (
                        <div className="form-group" key={campo}>
                            <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                            <input
                                placeholder={campo}
                                value={negocioForm[campo]}
                                onChange={(e) => setNegocioForm({ ...negocioForm, [campo]: e.target.value })}
                            />
                        </div>
                    ))}
                    {errorNegocio && <p className="auth-error">{errorNegocio}</p>}
                    {mensajeNegocio && <p style={{ color: "var(--success)", fontSize: "0.85rem" }}>{mensajeNegocio}</p>}
                    <button type="submit" className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
                        {negocio ? "Guardar cambios" : "Crear negocio"}
                    </button>
                </form>
            </div>

            {/* Servicios */}
            {negocio && (
                <>
                    <div className="page-header" style={{ marginTop: "1rem" }}>
                        <h2>Servicios</h2>
                    </div>

                    {/* Lista de servicios */}
                    {servicios.length === 0 ? (
                        <div className="empty"><p>No tenés servicios creados.</p></div>
                    ) : (
                        <div className="turno-list" style={{ marginBottom: "2rem" }}>
                            {servicios.map(servicio => (
                                <div key={servicio.id} className="turno-card">
                                    <div className="turno-info">
                                        <h3>{servicio.nombre}</h3>
                                        <p>{servicio.descripcion}</p>
                                        <p>${servicio.precio} · {servicio.duracionMinutos} min</p>
                                    </div>
                                    <span className={`estado ${servicio.activo ? "estado-CONFIRMADO" : "estado-CANCELADO"}`}>
                                        {servicio.activo ? "Activo" : "Inactivo"}
                                    </span>
                                    <div className="action-group">
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => handleEditarServicio(servicio)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={`btn btn-sm ${servicio.activo ? "btn-danger" : "btn-success"}`}
                                            onClick={() => handleToggleServicio(servicio.id)}
                                        >
                                            {servicio.activo ? "Desactivar" : "Activar"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Formulario servicio */}
                    <div className="form-card">
                        <h3 style={{ marginBottom: "1.25rem" }}>
                            {editandoServicio ? "Editar servicio" : "Agregar servicio"}
                        </h3>
                        <form onSubmit={handleServicio}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    placeholder="Nombre del servicio"
                                    value={servicioForm.nombre}
                                    onChange={(e) => setServicioForm({ ...servicioForm, nombre: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input
                                    placeholder="Descripción"
                                    value={servicioForm.descripcion}
                                    onChange={(e) => setServicioForm({ ...servicioForm, descripcion: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={servicioForm.precio}
                                    onChange={(e) => setServicioForm({ ...servicioForm, precio: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duración (minutos)</label>
                                <input
                                    type="number"
                                    placeholder="Duración en minutos"
                                    value={servicioForm.duracionMinutos}
                                    onChange={(e) => setServicioForm({ ...servicioForm, duracionMinutos: e.target.value })}
                                />
                            </div>
                            {errorServicio && <p className="auth-error">{errorServicio}</p>}
                            {mensajeServicio && <p style={{ color: "var(--success)", fontSize: "0.85rem" }}>{mensajeServicio}</p>}
                            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                                <button type="submit" className="btn btn-primary">
                                    {editandoServicio ? "Guardar cambios" : "Agregar servicio"}
                                </button>
                                {editandoServicio && (
                                    <button type="button" className="btn btn-outline" onClick={handleCancelarEdicion}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </>
            )}
        </Layout>
    );
}

export default MiNegocio;