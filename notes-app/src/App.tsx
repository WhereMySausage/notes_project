import { useState } from "react";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/notes";
import Count from "./components/Count";
import { INote } from "./models/note";
import Search from "./components/Search";

function App() {
  const localNotes = localStorage.getItem('notes') || '[]';
  const [notes, setNotes] = useState<INote[]>(JSON.parse(localNotes));
  
  function addNote(newNote: INote): void {
    notes.push(newNote)
    setNotes([...notes!]);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function deleteNote(id: string): void {
    const filteredNotes = notes.filter(note => note.id !== id) 
    setNotes(filteredNotes);
    localStorage.setItem('notes', JSON.stringify(filteredNotes)); 
    localStorage.removeItem(id);
  }


  return (
    <div>
      <Header />
      <Search />
      <Count
        count={
          notes && notes.length === 0
            ? "Notes missing"
            : `You have ${notes!.length} Notes `
        }
      />
      <CreateArea onAdd={addNote} />
      {notes && notes.map((note) => (
        <Note
          date={note.date}
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default App;
