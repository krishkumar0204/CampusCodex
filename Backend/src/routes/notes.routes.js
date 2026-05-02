import { Router } from "express";
import {
  addNotes,
  getNotes,
  toggleSaveNotes,
  searchNotes,
} from "../controllers/notes.controllers.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Notes from "../models/notes.models.js";
import axios from "axios";

const router = Router();

router.get("/notes", getNotes);
router.get("/notes/search", searchNotes);

router.post(
  "/notes",
  authMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addNotes,
);
router.post("/notes/save/:id", authMiddleware, toggleSaveNotes);

export default router;
