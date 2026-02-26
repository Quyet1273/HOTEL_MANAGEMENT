import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios"

// ================= BASE URL =================
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api"

// ================= AXIOS INSTANCE =================
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // BẮT BUỘC nếu dùng refresh token cookie
})

// ================= REQUEST INTERCEPTOR =================
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token")

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ================= RESPONSE INTERCEPTOR =================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config

    if (!originalRequest) {
      return Promise.reject(error)
    }

    const isUnauthorized = error.response?.status === 401
    const isRefreshCall = originalRequest.url?.includes(
      "/auth/refresh-token"
    )

    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true

      try {
        // 🔥 DÙNG CHÍNH axiosClient để giữ baseURL + credentials
        const res = await axiosClient.post("/auth/refresh-token")

        const newAccessToken = res.data.accessToken

        if (newAccessToken) {
          localStorage.setItem("access_token", newAccessToken)

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`

          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem("access_token")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient