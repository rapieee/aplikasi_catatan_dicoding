import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Menambah catatan ketika formulir dikirim
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      addNote(newNote); // Menambah catatan
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>Tambahkan Catatan</h2>
      <div>
        <input
          type="text"
          placeholder="Judul Catatan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="50"
        />
        <textarea
          placeholder="Isi Catatan"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Tambah Catatan</button>
    </form>
  );
};

export default NoteForm;
