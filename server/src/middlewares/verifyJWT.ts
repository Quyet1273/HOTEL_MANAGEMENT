import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth";

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // 1. Check header
  if (!authHeader) {
    return res.status(401).json({
      message: "Thiếu Authorization header",
    });
  }

  // 2. Check Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization phải theo dạng Bearer token",
    });
  }

  const token = authHeader.split(" ")[1];

  // 3. Verify token
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload;

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn",
      });
    }

    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
// Bearer check

// Typing rõ ràng

// Phân biệt token hết hạn vs token sai

// Không silent error