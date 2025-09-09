const Note = require("../models/notesModel");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = { getAllNotes, createNote };
