import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const generateAccessToken = (payload: any) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });

export const generateRefreshToken = (payload: any) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);