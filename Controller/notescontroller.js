import { query } from "../Database/database.js";

// Menampilkan semua notes (Get)
const getNotes = async (req, res) => {
  try {
    // Query untuk mendapatkan data
    const results = await query(`SELECT * FROM notes`);

    return res.status(200).json({
      msg: "Berhasil, Data akan di tampilkan",
      data: results,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Gagal, coba kembali",
      error: error.message,
    });
  }
};

// Mampu mmebuat notes baru (add) 
const addnotes = async (req, res) => {
  const { title, note } = req.body;

  try {
    const result = await query(
      `INSERT INTO notes (title, datetime, note) VALUES (?, NOW(), ?)`,
      [title, note]
    );

    return res.status(200).json({
      msg: "Notes baru berhasil ditambahkan",
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Gagal menambahkan data, coba kembali",
      error: error.message,
    });
  }
};

// Mampu mengubah notes (update) 
const updateNotes = async (req, res) => {
  const { title, note } = req.body;
  const { id } = req.params;

  try {
    await query(
      "UPDATE notes SET title = ?, datetime = NOW() ,note = ? WHERE id = ?",
      [title, note, id]
    );

    const check = await query("SELECT id FROM notes WHERE id = ?", [id]);
    if (check.length === 0) {
      return res.status(404).json({
        msg: "Maaf, data dengan ID ini tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Selamat Notes Berhasil di Update",
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Notes Gagal Update, coba kembali",
      error,
    });
  }
};

// Mampu menampilkan salah satu notes(get one note)
const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query("SELECT * FROM notes WHERE id = ?", [id]);

    if (result.length === 0) {
      return res.status(404).json({
        msg: "Maaf, data dengan ID ini tidak ditemukan",
      });
    }

    return res.status(200).json({
      msg: "Berhasil menemukan data",
      data: result[0],
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Gagal mendapatkan data",
      error: error.message,
    });
  }
};

// Mampu menghapus notes berdasarkan id (Delete)
const deleteNotesbyid = async (req, res) => {
  const { id } = req.params;

  // cek id, apakah ada atau tidak
  const cek = await query(`SELECT * FROM notes WHERE notes.id = ?`, [id]);
  if (cek.length === 0) {
    return res.status(400).json({
      msg: "Maaf, data dengan ID ini tidak ditemukan",
    });
  }

  try {
    await query("DELETE FROM notes WHERE id = ?", [id]);

    res.status(200).json({ message: "data berhasil di hapus" });
  } catch (err) {
    res.status(500).json({
      msg: "gagal menghapus, coba kembali",
      error: err.message,
    });
  }
};

export { getNotes, updateNotes, addnotes, getNoteById, deleteNotesbyid };
