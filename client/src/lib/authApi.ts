import axiosClient from "./axiosClient"

/* ================= TYPES ================= */
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  phone: string
  address?: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken?: string
  user: any
}

/* ================= API ================= */
export const authApi = {
  login(data: LoginPayload) {
    return axiosClient.post<AuthResponse>("/auth/login", data)
  },

  register(data: RegisterPayload) {
    // map field cho backend
    const payload = {
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      confirmPassword: data.confirmPassword, // ✅ BẮT BUỘC
    }
      return axiosClient.post("/auth/register", payload)
  },

  refreshToken() {
    return axiosClient.post<{ accessToken: string }>("/auth/refresh-token")
  },

  logout() {
    return axiosClient.post("/auth/logout")
  },

  me() {
    return axiosClient.get("/auth/me")
  },
}