const Note = require("../models/notesModel");

const getAllNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const notes = await Note.find().skip(skip).limit(limit);
    const totalNotes = await Note.countDocuments();

    res.json({
      notes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNotes / limit),
        totalNotes,
        hasNext: page * limit < totalNotes,
      },
    });
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
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const searchNotes = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
};
