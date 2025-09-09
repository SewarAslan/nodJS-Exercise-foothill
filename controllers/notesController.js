const Note = require("../models/noteModel");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
