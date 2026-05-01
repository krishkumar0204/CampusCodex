import httpsStatus from "http-status";
import Notes from "../models/notes.models.js";
import { User } from "../models/user.models.js";
import supabase from "../config/supabase.js";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const addNotes = async (req, res) => {
  try {
    const { title, description } = req.body;

    const thumbnailFile = req.files.thumbnail[0];
    const pdfFile = req.files.pdf[0];

    if (!title || !description || !thumbnailFile || !pdfFile) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    const cleanThumbnail = thumbnailFile.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const cleanPdf = pdfFile.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const thumbnailName = `thumbnails/${Date.now()}_${cleanThumbnail}`;
    const pdfName = `pdfs/${Date.now()}_${cleanPdf}`;

    // upload thumbnail
    const { error: thumbError } = await supabase.storage
      .from("notes")
      .upload(thumbnailName, thumbnailFile.buffer, {
        contentType: thumbnailFile.mimetype,
      });

    if (thumbError) {
      console.error("Thumbnail Upload Error:", thumbError);
      return res.status(500).json({ message: thumbError.message });
    }

    // upload pdf
    const { error: pdfError } = await supabase.storage
      .from("notes")
      .upload(pdfName, pdfFile.buffer, { contentType: pdfFile.mimetype });

    if (pdfError) {
      console.error("PDF Upload Error:", pdfError);
      return res.status(500).json({ message: pdfError.message });
    }

    // get public urls
    const { data: thumbPublicUrl } = supabase.storage
      .from("notes")
      .getPublicUrl(thumbnailName);

    const { data: pdfPublicUrl } = supabase.storage
      .from("notes")
      .getPublicUrl(pdfName);

    const thumbnailUrl = thumbPublicUrl.publicUrl;
    const pdfUrl = pdfPublicUrl.publicUrl;

    const newNote = new Notes({
      title,
      description,
      thumbnail: thumbnailUrl,
      pdf: pdfUrl,
    });

    await newNote.save();

    res.status(201).json({ message: "Notes uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (e) {
    return res
      .status(httpsStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something went wrong ${e.message}` });
  }
};

const toggleSaveNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const alreadySaved = user.savedNotes.includes(noteId);

    if (alreadySaved) {
      await User.findByIdAndUpdate(userId, {
        $pull: { savedNotes: noteId },
      });

      return res.json({
        message: "Note removed",
        saved: false,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          savedNotes: noteId,
        },
      });

      return res.json({
        message: "Note saved",
        saved: true,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSavedNotes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedNotes");
    res.json(user.savedNotes);
  } catch (err) {
    res.status(300).json({ message: err.message });
  }
};

const searchNotes = async (req, res) => {
  try {
    const searchTerm = req.query.query || req.query.q || "";
    const notes = await Notes.find({
      title: { $regex: searchTerm, $options: "i" },
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { addNotes, getNotes, toggleSaveNotes, getSavedNotes, searchNotes };
