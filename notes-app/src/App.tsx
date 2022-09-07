import React, { useState } from 'react';
import Header from './components/Header';
import CreateArea, { INote } from './components/CreateArea';
import Notes from './components/notes';
import Count from './components/Count';

function App(props: any) {
  const [notes, setNotes] = useState<INote[]>([])

  function addNote(newNote:INote):void {
    setNotes(prevValue => {
      return [...prevValue, newNote];
    });
  }

function deleteNotes(id:number):void {
  setNotes(prevValue => {
    return [...prevValue.filter((note, index) =>
      index !== id)];
  });
}

function editNotes(id:number):void {
  setNotes(prevValue => {
    return [...prevValue.filter((note, index) =>
      index !== id)];
  });
}
  
  return (
    <div>
      <Header />
      <Count count={notes.length === 0 ? "Notes missing" : `You have ${notes.length} Notes ` } />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Notes
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
          onEdit={editNotes} />
        ))}
    </div>
  );
  
};

export default App;