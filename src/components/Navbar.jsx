import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function getUserFromToken() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            role: payload.role,
            email: payload.sub,
            nombre: payload.nombre,
            apellido: payload.apellido
        };
    } catch {
        return null;
    }
}

function Navbar() {
    const navigate = useNavigate();
    const user = getUserFromToken();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            await logout(refreshToken);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/");
        }
    };

    return (
        <nav style={{ position: "relative" }}>
            <Link to="/home">TurnoFlow</Link>

            {(user?.role === "USER" || user?.role === "ADMIN" || user?.role === "NEGOCIO") && (
                <Link to="/negocios">Negocios</Link>
            )}
            {user?.role === "NEGOCIO" && (
                <Link to="/mi-negocio">Mi Negocio</Link>
            )}
            {(user?.role === "USER" || user?.role === "ADMIN") && (
                <Link to="/mis-turnos">Mis Turnos</Link>
            )}
            {user?.role === "NEGOCIO" && (
                <Link to="/mis-turnos-negocio">Turnos del Negocio</Link>
            )}
            {user?.role === "ADMIN" && (
                <Link to="/admin">Administración</Link>
            )}

            {/* Avatar / dropdown trigger */}
            <div style={{ marginLeft: "auto", position: "relative" }}>
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: "var(--accent-glow)",
                        border: "1px solid var(--border-h)",
                        color: "var(--accent-soft)",
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "uppercase"
                    }}
                >
                    {user?.nombre?.[0]}{user?.apellido?.[0]}
                </button>

                {open && (
                    <div style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 10px)",
                        width: "220px",
                        background: "#13131a",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        padding: "1rem",
                        boxShadow: "var(--shadow)",
                        zIndex: 200,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem"
                    }}>
                        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem", marginBottom: "0.25rem" }}>
                            <p style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>
                                {user?.nombre} {user?.apellido}
                            </p>
                            <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{user?.email}</p>
                            <span className={`badge badge-role badge-${user?.role}`} style={{ marginTop: "0.5rem" }}>
                                {user?.role}
                            </span>
                        </div>

                        <button
                            className="btn btn-outline"
                            style={{ width: "100%", justifyContent: "center" }}
                            onClick={() => { navigate("/perfil"); setOpen(false); }}
                        >
                            Editar perfil
                        </button>

                        <button
                            className="btn btn-danger"
                            style={{ width: "100%", justifyContent: "center" }}
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;