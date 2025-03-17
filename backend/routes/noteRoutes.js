const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createNote, getNotes, getNoteById, deleteNote, shareNote, updateNote } = require("../controllers/noteController");

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post("/:id/share", protect, shareNote);

module.exports = router;
