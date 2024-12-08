import express from "express";
import {
  getNotes,
  updateNotes,
  addnotes,
  getNoteById,
  deleteNotesbyid,
} from "../../Controller/notescontroller.js";
import { validasi } from "../../middleware/validasi.js";

const notesrouter = express();

notesrouter.get("/getnotes", getNotes);
notesrouter.post("/addnotes", validasi(["title", "note"]), addnotes);
notesrouter.put("/update/:id", validasi(["title", "note"]), updateNotes);
notesrouter.get("/notes/:id", getNoteById);
notesrouter.delete("/delete/:id", deleteNotesbyid);

export default notesrouter;
