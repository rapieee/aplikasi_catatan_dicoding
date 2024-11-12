import React, { useState, useEffect } from 'react';
import './styles.css';

const App = ({ initialNotes }) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Inisialisasi state `notes` dengan data awal dari `initialNotes`
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  // Fungsi untuk memformat tanggal dengan format yang lebih rapi
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  // Fungsi untuk menambahkan catatan baru
  const addNote = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    const newNote = {
      id: Date.now(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    setNotes([...notes, newNote]);
    e.target.reset();
  };

  // Fungsi untuk mengarsipkan atau mengaktifkan kembali catatan
  const toggleArchiveNote = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

  // Fungsi untuk menghapus catatan
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Fungsi untuk mencari catatan berdasarkan judul atau isi catatan
  const filteredNotes = notes.filter(note => 
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     note.body.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Notes App</h1>
      </header>

      <div className="form-and-search">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Cari Catatan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <form className="note-form" onSubmit={addNote}>
          <input name="title" type="text" placeholder="Judul Catatan" maxLength="50" />
          <textarea name="body" placeholder="Isi Catatan" />
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>

      <div className="note-list-container">
        <div className="note-list">
          <h2>Catatan Aktif</h2>
          {filteredNotes.filter(note => !note.archived).length > 0 ? (
            filteredNotes.filter(note => !note.archived).map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <small>{`Dibuat pada: ${formatDate(note.createdAt)}`}</small>
                </div>
                <div className="note-actions">
                  <button onClick={() => toggleArchiveNote(note.id)}>Arsipkan</button>
                  <button onClick={() => deleteNote(note.id)}>Hapus</button>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada catatan aktif</p>
          )}
        </div>

        <div className="note-list">
          <h2>Catatan Arsip</h2>
          {filteredNotes.filter(note => note.archived).length > 0 ? (
            filteredNotes.filter(note => note.archived).map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <small>{`Dibuat pada: ${formatDate(note.createdAt)}`}</small>
                </div>
                <div className="note-actions">
                  <button onClick={() => toggleArchiveNote(note.id)}>Aktifkan</button>
                  <button onClick={() => deleteNote(note.id)}>Hapus</button>
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
};

export default App;
