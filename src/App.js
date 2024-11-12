import React, { useState } from 'react';
import './styles.css';  // Pastikan file CSS ada

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Catatan 1', content: 'Isi catatan pertama', archived: false },
    { id: 2, title: 'Catatan 2', content: 'Isi catatan kedua', archived: false },
    { id: 3, title: 'Catatan 3', content: 'Isi catatan ketiga', archived: true },
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.title && newNote.content) {
      setNotes([
        ...notes,
        { id: notes.length + 1, title: newNote.title, content: newNote.content, archived: false },
      ]);
      setNewNote({ title: '', content: '' });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter(
    (note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()) && !note.archived
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Notes App</h1>
      </header>

      {/* Pencarian */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari Catatan..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="form-and-search">
        {/* Formulir untuk menambah catatan */}
        <form className="note-form" onSubmit={handleAddNote}>
          <input
            type="text"
            name="title"
            placeholder="Judul Catatan"
            value={newNote.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Isi Catatan"
            value={newNote.content}
            onChange={handleInputChange}
          />
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>

      <div className="note-list-container">
        <div className="note-list">
          <h2>Catatan Aktif</h2>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
                <div className="note-actions">
                  <button onClick={() => handleArchive(note.id)}>Arsipkan</button>
                  <button onClick={() => handleDelete(note.id)}>Hapus</button>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada catatan aktif</p>
          )}
        </div>

        <div className="note-list">
          <h2>Catatan Arsip</h2>
          {notes.filter(note => note.archived).length > 0 ? (
            notes.filter(note => note.archived).map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
                <div className="note-actions">
                  <button onClick={() => handleUnarchive(note.id)}>Unarchive</button>
                  <button onClick={() => handleDelete(note.id)}>Hapus</button>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada catatan arsip</p>
          )}
        </div>
      </div>
    </div>
  );

  // Fungsi untuk mengarsipkan catatan
  function handleArchive(id) {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, archived: true } : note
    ));
  }

  // Fungsi untuk membatalkan arsip catatan
  function handleUnarchive(id) {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, archived: false } : note
    ));
  }

  // Fungsi untuk menghapus catatan
  function handleDelete(id) {
    setNotes(notes.filter(note => note.id !== id));
  }
};

export default App;
