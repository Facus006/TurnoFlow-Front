import { useState } from "react";
import Layout from "../components/Layout";
import { editarUsuario, editarPassword, editarEmail } from "../services/usuarioService";
import { getErrorMessage } from "../utils/errorHandler";

function Perfil() {

    const [datosForm, setDatosForm] = useState({ nombre: "", apellido: "" });
    const [passwordForm, setPasswordForm] = useState({ password: "", nuevoPassword: "", nuevoPassword2: "" });
    const [emailForm, setEmailForm] = useState({ email: "", password: "" });

    const [mensajeDatos, setMensajeDatos] = useState(null);
    const [mensajePassword, setMensajePassword] = useState(null);
    const [mensajeEmail, setMensajeEmail] = useState(null);

    const [errorDatos, setErrorDatos] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);

    const handleDatos = async (e) => {
        e.preventDefault();
        setErrorDatos(null);
        setMensajeDatos(null);
        try {
            await editarUsuario(datosForm);
            setMensajeDatos("Datos actualizados correctamente");
            setDatosForm({ nombre: "", apellido: "" });
        } catch (error) {
            setErrorDatos(getErrorMessage(error, "Error al actualizar datos"));
        }
    };

    const handlePassword = async (e) => {
        e.preventDefault();
        setErrorPassword(null);
        setMensajePassword(null);
        try {
            const data = await editarPassword(passwordForm);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            setMensajePassword("Contraseña actualizada correctamente");
            setPasswordForm({ password: "", nuevoPassword: "", nuevoPassword2: "" });
        } catch (error) {
            setErrorPassword(getErrorMessage(error, "Error al cambiar contraseña"));
        }
    };

    const handleEmail = async (e) => {
        e.preventDefault();
        setErrorEmail(null);
        setMensajeEmail(null);
        try {
            const data = await editarEmail(emailForm);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            setMensajeEmail("Email actualizado correctamente");
            setEmailForm({ email: "", password: "" });
        } catch (error) {
            setErrorEmail(getErrorMessage(error, "Error al cambiar email"));
        }
    };

    return (
        <Layout>
            <div className="page-header">
                <h1>Mi Perfil</h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* Editar datos */}
                <div className="form-card">
                    <h3 style={{ marginBottom: "1.25rem" }}>Editar datos</h3>
                    <form onSubmit={handleDatos}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                placeholder="Nuevo nombre"
                                value={datosForm.nombre}
                                onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input
                                placeholder="Nuevo apellido"
                                value={datosForm.apellido}
                                onChange={(e) => setDatosForm({ ...datosForm, apellido: e.target.value })}
                            />
                        </div>
                        {errorDatos && <p className="auth-error">{errorDatos}</p>}
                        {mensajeDatos && <p style={{ color: "var(--success)", fontSize: "0.85rem" }}>{mensajeDatos}</p>}
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
                            Guardar cambios
                        </button>
                    </form>
                </div>

                {/* Cambiar contraseña */}
                <div className="form-card">
                    <h3 style={{ marginBottom: "1.25rem" }}>Cambiar contraseña</h3>
                    <form onSubmit={handlePassword}>
                        <div className="form-group">
                            <label>Contraseña actual</label>
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                value={passwordForm.password}
                                onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nueva contraseña</label>
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                value={passwordForm.nuevoPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, nuevoPassword: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Repetir nueva contraseña</label>
                            <input
                                type="password"
                                placeholder="Repetir nueva contraseña"
                                value={passwordForm.nuevoPassword2}
                                onChange={(e) => setPasswordForm({ ...passwordForm, nuevoPassword2: e.target.value })}
                            />
                        </div>
                        {errorPassword && <p className="auth-error">{errorPassword}</p>}
                        {mensajePassword && <p style={{ color: "var(--success)", fontSize: "0.85rem" }}>{mensajePassword}</p>}
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
                            Cambiar contraseña
                        </button>
                    </form>
                </div>

                {/* Cambiar email */}
                <div className="form-card">
                    <h3 style={{ marginBottom: "1.25rem" }}>Cambiar email</h3>
                    <form onSubmit={handleEmail}>
                        <div className="form-group">
                            <label>Nuevo email</label>
                            <input
                                type="email"
                                placeholder="Nuevo email"
                                value={emailForm.email}
                                onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña actual</label>
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                value={emailForm.password}
                                onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                            />
                        </div>
                        {errorEmail && <p className="auth-error">{errorEmail}</p>}
                        {mensajeEmail && <p style={{ color: "var(--success)", fontSize: "0.85rem" }}>{mensajeEmail}</p>}
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
                            Cambiar email
                        </button>
                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default Perfil;