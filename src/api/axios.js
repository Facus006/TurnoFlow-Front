import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

let isRefreshing = false;
let pendingRequests = [];

const processPending = (error, token = null) => {
    pendingRequests.forEach((p) => {
        if (error) {
            p.reject(error);
        } else {
            p.resolve(token);
        }
    });
    pendingRequests = [];
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (originalRequest.url.includes("/auth/")) {
                return Promise.reject(error);
            }
            if (isRefreshing) {
                // ya hay un refresh en curso, esperamos que termine
                return new Promise((resolve, reject) => {
                    pendingRequests.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const response = await axios.post(
                    "http://localhost:8080/auth/refresh",
                    { refreshToken }
                );

                const nuevoToken = response.data.accessToken;
                localStorage.setItem("accessToken", nuevoToken);

                processPending(null, nuevoToken);

                originalRequest.headers.Authorization = `Bearer ${nuevoToken}`;
                return api(originalRequest);

            } catch (err) {
                processPending(err, null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;