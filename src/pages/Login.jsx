import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const data = await login(email, password);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate("/home");
        } catch (error) {
            setError(getErrorMessage(error, "Error al iniciar sesión"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">Turnos<span>App</span></div>
                <p className="auth-subtitle">Ingresá a tu cuenta</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>

                    <p className="auth-redirect">
                        ¿No tenés cuenta?{" "}
                        <span onClick={() => navigate("/register")}>Registrate</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
