const express = require("express");
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
} = require("../controllers/notesController");

const router = express.Router();
router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/search", searchNotes);

module.exports = router;
