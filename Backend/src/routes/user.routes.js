import { Router } from "express";
import { updateProfile } from "../controllers/user.controllers.js";
import { getSavedNotes } from "../controllers/notes.controllers.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);
router.get("/saved-notes", authMiddleware, getSavedNotes);

export default router;
