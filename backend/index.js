const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];
let id = 1;

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST create note
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: id++,
    title: req.body.title,
    content: req.body.content
  };
  notes.push(newNote);
  res.json(newNote);
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// UPDATE note
app.put("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.map(note =>
    note.id === noteId
      ? { ...note, title: req.body.title, content: req.body.content }
      : note
  );
  res.json({ message: "Updated successfully" });
});
