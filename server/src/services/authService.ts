import bcrypt from "bcryptjs"
import { supabase } from "../config/supabase"

/* ================= TYPES ================= */
export interface RegisterPayload {
  fullName: string
  email: string
  phone: string
  address?: string
  password: string
}

/* ================= FIND BY EMAIL ================= */
export const findByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("email", email)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/* ================= REGISTER ================= */
export const register = async (payload: RegisterPayload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10)

  const { data, error } = await supabase
    .from("employees")
    .insert({
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      address: payload.address,
      password: hashedPassword,
      role: "staff",
      status: "active",
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Không trả password về controller
  delete (data as any).password
  return data
}

/* ================= PASSWORD ================= */
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}

export const verifyPassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, hashedPassword)
}