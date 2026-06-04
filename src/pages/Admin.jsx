import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerUsuarios, toggleEstadoUsuario, toggleRolAdmin, setRolNegocio, setRolUser, eliminarUsuario } from "../services/usuarioService";
import { getErrorMessage } from "../utils/errorHandler";
import Layout from "../components/Layout";

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerUsuarios();
            setUsuarios(data.content);
        } catch (error) {
            setError(getErrorMessage(error, "Error al cargar usuarios"));
        } finally {
            setLoading(false);
        }
    };

    const handleToggleEstado = async (id) => {
        try {
            await toggleEstadoUsuario(id);
            await cargarUsuarios();
        } catch (error) {
            setError(getErrorMessage(error, "Error al cambiar el estado"));
        }
    };

    const handleToggleRolAdmin = async (id) => {
        try {
            await toggleRolAdmin(id);
            await cargarUsuarios();
        } catch (error) {
            setError(getErrorMessage(error, "Error al cambiar el rol"));
        }
    };

    const handleSetRolNegocio = async (id) => {
        try {
            await setRolNegocio(id);
            await cargarUsuarios();
        } catch (error) {
            setError(getErrorMessage(error, "Error al asignar rol negocio"));
        }
    };

    const handleSetRolUser = async (id) => {
        try {
            await setRolUser(id);
            await cargarUsuarios();
        } catch (error) {
            setError(getErrorMessage(error, "Error al asignar rol user"));
        }
    };

    const handleEliminar = async (id) => {
        try {
            await eliminarUsuario(id);
            setConfirmDelete(null);
            await cargarUsuarios();
        } catch (error) {
            setError(getErrorMessage(error, "Error al eliminar el usuario"));
        }
    };

    useEffect(() => { cargarUsuarios(); }, []);

    return (
        <Layout>
            <div className="page-header">
                <h1>Panel de Administración</h1>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn btn-outline" onClick={() => navigate("/admin/negocios")}>
                        Ver negocios
                    </button>
                    <span className="badge">{usuarios.length} usuarios</span>
                </div>
            </div>

            {error && (
                <p className="auth-error" style={{ marginBottom: "1rem" }}>
                    {error}
                </p>
            )}

            {loading ? (
                <div className="empty"><p>Cargando usuarios...</p></div>
            ) : usuarios.length === 0 ? (
                <div className="empty"><p>No hay usuarios registrados.</p></div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.id} className={!usuario.enabled ? "row-disabled" : ""}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">
                                                {usuario.nombre?.[0]}{usuario.apellido?.[0]}
                                            </div>
                                            <span>{usuario.nombre} {usuario.apellido}</span>
                                        </div>
                                    </td>
                                    <td className="cell-muted">{usuario.email}</td>
                                    <td>
                                        <span className={`badge badge-role badge-${usuario.rol}`}>
                                            {usuario.rol}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`estado ${usuario.enabled ? "estado-CONFIRMADO" : "estado-CANCELADO"}`}>
                                            {usuario.enabled ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            <button
                                                className={`btn btn-sm ${usuario.enabled ? "btn-danger" : "btn-outline"}`}
                                                onClick={() => handleToggleEstado(usuario.id)}
                                            >
                                                {usuario.enabled ? "Deshabilitar" : "Habilitar"}
                                            </button>

                                            {usuario.rol === "USER" && (
                                                <button
                                                    className="btn btn-sm btn-negocio"
                                                    onClick={() => handleSetRolNegocio(usuario.id)}
                                                >
                                                    → Negocio
                                                </button>
                                            )}
                                            {usuario.rol === "NEGOCIO" && (
                                                <button
                                                    className="btn btn-sm btn-user"
                                                    onClick={() => handleSetRolUser(usuario.id)}
                                                >
                                                    → User
                                                </button>
                                            )}
                                            {(usuario.rol === "USER" || usuario.rol === "ADMIN") && (
                                                <button
                                                    className="btn btn-sm btn-admin"
                                                    onClick={() => handleToggleRolAdmin(usuario.id)}
                                                >
                                                    {usuario.rol === "ADMIN" ? "→ User" : "→ Admin"}
                                                </button>
                                            )}

                                            {confirmDelete === usuario.id ? (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleEliminar(usuario.id)}
                                                    >
                                                        Confirmar
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline"
                                                        onClick={() => setConfirmDelete(null)}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-delete"
                                                    onClick={() => setConfirmDelete(usuario.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
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

export default Admin;
