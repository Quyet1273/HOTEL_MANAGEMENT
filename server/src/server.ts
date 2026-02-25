import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import { supabase } from './config/supabase';
import authRouter from './routes/authRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;
// Cho phép frontend gọi API
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


const testSupabase = async () => {
  const { error } = await supabase.from('rooms').select('*').limit(1);
  console.log(error ? '❌ Supabase FAIL' : '✅ Supabase CONNECTED');
};

testSupabase();
////////////////////router //////////////////////
app.use("/api/auth", authRouter);


/////
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
