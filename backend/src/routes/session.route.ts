import express from "express";
import {
  getAllPublishedSessions,
  createSession,
  updateSession,
  getSingleSession
} from "../controllers/session.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { getMySessions } from "../controllers/session.controller";

const router = express.Router();

router.get("/", getAllPublishedSessions);
router.get("/my-sessions", authMiddleware, getMySessions);
router.get("/:id", authMiddleware, getSingleSession);
router.post("/", authMiddleware, createSession);
router.put("/:id", authMiddleware, updateSession);

export default router;
