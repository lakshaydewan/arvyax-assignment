import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user"; // Assuming you have a User model to check against

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

interface JwtPayload {
  id: string;
}

export const authMiddleware = async (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }

  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as unknown as JwtPayload;
    req.user = { id: decoded.id };
    console.log("User authenticated:", req.user.id);

    // check if user exists in database
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    console.log("User found in database:", user.id);

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
