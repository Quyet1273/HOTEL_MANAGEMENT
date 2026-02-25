import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 BẮT BUỘC cho refresh token
})

// ================= REQUEST =================
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

// ================= RESPONSE =================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true

      try {
        // 🔥 DÙNG AXIOS THƯỜNG
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        )

        const newAccessToken = res.data.accessToken

        localStorage.setItem("access_token", newAccessToken)

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`

        return axiosClient(originalRequest)

      } catch (err) {
        localStorage.removeItem("access_token")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient