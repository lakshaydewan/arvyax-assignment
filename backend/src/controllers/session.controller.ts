import { Request, Response } from "express";
import Session from '../models/session'

// GET /api/session — get all published sessions
export const getAllPublishedSessions = async (_req: Request, res: Response) => {
    try {
        const sessions = await Session.find({ status: "published" }).populate("user", "email");
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch published sessions", error: err });
    }
};

// GET /api/session/my-sessions — get logged-in user’s sessions
export const getMySessions = async (req: Request & { user?: { id: string } }, res: Response) => {
    console.log("User ID from request:", req.user?.id);

    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized: No user ID found" });
        return
    }

    try {
        console.log("Fetching sessions for user:", req.user?.id);
        const sessions = await Session.find({ user: req.user?.id }).sort({ updatedAt: -1 });
        console.log("User's sessions:", sessions);
        res.json(sessions);
    } catch (err) {
        console.error("Error fetching user's sessions:", err);
        res.status(500).json({ message: "Failed to fetch user's sessions", error: err });
    }
};

// GET /api/session/:id — get one session if owned or published
export const getSingleSession = async (req: Request & { user?: any }, res: Response) => {
    try {
        const session = await Session.findById(req.params.id).populate("user", "email");

        if (!session) {
            res.status(404).json({ message: "Session not found" });
            return
        }

        const isOwner = session.user?._id.toString() === req.user?.id;
        const isPublished = session.status === "published";

        if (!isPublished && !isOwner) {
            res.status(403).json({ message: "Unauthorized access to draft" });
            return
        }

        res.json(session);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch session", error: err });
    }
};

// POST /api/session — create a new session
export const createSession = async (req: Request & { user?: any }, res: Response) => {
    const { title, tags, jsonUrl, status } = req.body;

    if (!title || !tags || !jsonUrl) {
        res.status(400).json({
            message: `Please include a Title, tags eg: "new, nothing", and jsonUrl to create a session.`
        })
        return
    }

    if (status !== "draft" && status !== "published") {
        res.status(400).json({
            message: "Status should be either 'draft'  or  'published'."
        })
        return
    }

    try {
        const newSession = new Session({
            title,
            tags: tags,
            jsonUrl,
            status: status || "draft",
            user: req.user.id
        });

        await newSession.save();
        res.status(201).json(newSession);
    } catch (err) {
        res.status(500).json({ message: "Failed to create session", error: err });
    }
};

// PUT /api/session/:id — update a user’s session (draft/publish)
export const updateSession = async (req: Request & { user?: any }, res: Response) => {

    const { title, tags, jsonUrl, status } = req.body;

    console.log("Update request body:", req.body);

    if (!title || !tags || !jsonUrl || !status) {
        res.status(400).json({
            message: "Provide valid body for updation."
        })
    }

    console.log("Update request body:", req.body);

    if (status !== "draft" && status !== "published") {
        res.status(400).json({
            message: "Status should be either 'draft'  or  'published'."
        })
        return
    }

    console.log("User ID from request:", req.user?.id);

    try {
        const session = await Session.findById(req.params.id);
        console.log("Session found:", session);

        if (!session) {
            res.status(404).json({ message: "Session not found" });
            return;
        }

        if (session.user?.toString() !== req.user.id) {
            res.status(403).json({ message: "Not authorized to update this session" });
            return;
        }

        session.title = title ?? session.title;
        session.tags = tags ?? session.tags;
        session.jsonUrl = jsonUrl ?? session.jsonUrl;
        session.status = status ?? session.status;
        session.updatedAt = new Date();

        await session.save();
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: "Failed to update session", error: err });
    }
}