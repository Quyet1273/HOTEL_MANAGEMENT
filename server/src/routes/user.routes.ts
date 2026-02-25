import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT";
import { requireRole } from "../middlewares/requireRole";

const router = Router();

router.get(
  "/profile",
  verifyJWT,
  (req, res) => {
    res.json(req.user);
  }
);

router.get(
  "/admin/dashboard",
  verifyJWT,
  requireRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome admin" });
  }
);

router.get(
  "/manager/report",
  verifyJWT,
  requireRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Manager access granted" });
  }
);

export default router;