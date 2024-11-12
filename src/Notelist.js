import React from 'react';
import NoteItem from './Noteitem';

const NoteList = ({ notes, onDelete, onArchive, archived }) => {
  if (notes.length === 0) {
    return <p>Tidak ada catatan</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          archived={archived}
        />
      ))}
    </div>
  );
};

export default NoteList;
