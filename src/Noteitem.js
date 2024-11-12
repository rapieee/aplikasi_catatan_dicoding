import React from 'react';

const NoteItem = ({ note, onDelete, onArchive, archived }) => {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => (archived ? onDelete(note.id) : onArchive(note.id))}>
        {archived ? 'Hapus' : 'Arsipkan'}
      </button>
    </div>
  );
};

export default NoteItem;
