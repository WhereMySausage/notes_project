import { useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Count from "./components/Count";
import { INote } from "./models/note";
import Footer from "./components/Footer";


function App() {
  const localNotes = localStorage.getItem("notes") || "[]";
  const [notes, setNotes] = useState<INote[]>(JSON.parse(localNotes));

  function addNote(newNote: INote): void {
    notes.push(newNote);
    setNotes([...notes!]);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("seraching", JSON.stringify(notes));
    localStorage.setItem("notesdef", JSON.stringify(notes));
  }

  function deleteNote(id: string): void {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    localStorage.setItem("seraching", JSON.stringify(filteredNotes));
    localStorage.setItem("notesdef", JSON.stringify(filteredNotes));
    localStorage.removeItem("img" + id)
    localStorage.removeItem("edit" + id);
    localStorage.removeItem("TodoList" + id);
    localStorage.removeItem("TodoListdef" + id);
    localStorage.removeItem(id);
  }

  function sort(drag: any) {
    setNotes(drag);
    localStorage.setItem("notesdef", JSON.stringify(drag));
  }

    function search(arr: any): void{
      setNotes(arr);
  }

  return (
    <div>
      <Header/>
      <Search  onSearch={search}/>
      <Count
        count={
          notes && notes.length === 0
            ? "Notes missing"
            : `You have ${notes!.length} Notes `
        }
      />
      <CreateArea onAdd={addNote}  /> 
      {notes &&
        notes
          .map((note, index) => (
            <Note
            index={index}
            date={note.date}
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
              onSort={sort}
          />
          ))} 
      <Footer  />
      
    </div>
    
  );
}

export default App;
