import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
// 👉 File này giúp:

// Không cần Request & { user?: ... } nữa

// req.user dùng mọi nơi, autocomplete đầy đủ