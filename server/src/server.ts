import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import { supabase } from "./config/supabase"
import authRouter from "./routes/authRouter"

const app = express()

// ================= MIDDLEWARE =================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================= CORS =================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://hotel-management.vercel.app", // đổi thành domain frontend của bạn
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

// ================= SUPABASE TEST =================
const testSupabase = async () => {
  const { error } = await supabase.from("rooms").select("*").limit(1)

  if (error) {
    console.log("❌ Supabase FAIL")
  } else {
    console.log("✅ Supabase CONNECTED")
  }
}

testSupabase()

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("Server is running 🚀")
})

app.get("/api", (req, res) => {
  res.json({ message: "API is working ✅" })
})

app.use("/api/auth", authRouter)
// ================= START SERVER =================
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})