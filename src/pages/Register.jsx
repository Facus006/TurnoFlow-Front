import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";

function Register() {
    const [form, setForm] = useState({
        nombre: "", apellido: "", email: "", password: "", password2: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await register(form.nombre, form.apellido, form.email, form.password, form.password2);
            navigate("/");
        } catch (error) {
            setError(getErrorMessage(error, "Error al registrarse"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">Turnos<span>App</span></div>
                <p className="auth-subtitle">Creá tu cuenta</p>

                <form onSubmit={handleSubmit}>
                    <input name="nombre" placeholder="Nombre"
                        value={form.nombre} onChange={handleChange} />
                    <input name="apellido" placeholder="Apellido"
                        value={form.apellido} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email"
                        value={form.email} onChange={handleChange} />
                    <input name="password" type="password" placeholder="Contraseña"
                        value={form.password} onChange={handleChange} />
                    <input name="password2" type="password" placeholder="Repetir contraseña"
                        value={form.password2} onChange={handleChange} />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>

                    <p className="auth-redirect">
                        ¿Ya tenés cuenta?{" "}
                        <span onClick={() => navigate("/")}>Iniciá sesión</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
