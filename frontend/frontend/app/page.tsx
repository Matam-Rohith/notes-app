"use client";
import { useState, useEffect } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await fetch("https://notes-app-1-arh1.onrender.com/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function saveNote() {
    if (editId === null) {
      await fetch("https://notes-app-1-arh1.onrender.com/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
    } else {
      await fetch(`https://notes-app-1-arh1.onrender.com/api/notes/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      setEditId(null);
    }

    setTitle("");
    setContent("");
    fetchNotes();
  }

  function editNote(note: Note) {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  }

  async function deleteNote(id: number) {
    await fetch(`https://notes-app-1-arh1.onrender.com/api/notes/${id}`, {
      method: "DELETE"
    });
    fetchNotes();
  }

  return (
    <div className="container">
      <h1>Colorful Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="add-btn" onClick={saveNote}>
        {editId ? "Update Note" : "Add Note"}
      </button>

      {notes.map((note, index) => (
        <div key={note.id} className="note">
          <h3>{index + 1}. {note.title}</h3>
          <p>{note.content}</p>

          <div className="note-buttons">
            <button className="edit-btn" onClick={() => editNote(note)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
