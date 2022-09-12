import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { nanoid } from "nanoid";
import { INote } from "../models/note";

interface ICreateArea {
  onAdd: (newNote: INote) => void;
}

function CreateArea({ onAdd }: ICreateArea) {
  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, "0") +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    date.getFullYear() +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0");

  const [note, setNote] = useState<INote>({
    title: "",
    content: "",
    date: output,
    id: nanoid(),
  });

  function handleChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function submitButton(event: any) {
    event.preventDefault();

    setNote({
      title: "",
      content: "",
      date: output,
      id: nanoid(),
    });
    onAdd(note);
  }

  function autoGrow(element: any) {
    element.target.style.height = "20px";
    element.target.style.height = element.target.scrollHeight + "px";
  }

  return (
    <div>
      <form>
        <button
          onClick={(event) => {
            submitButton(event);
          }}
        >Add note
        </button>
      </form>
    </div>
  );
}

export default CreateArea;

/*<form name="form1">
        <input
          maxLength={30}
          value={note.title}
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <p>
          <textarea
            maxLength={500}
            onInput={autoGrow}
            value={note.content}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
          />
        </p>
        <input value={output} type="text" name="time" onChange={handleChange} /></form>*/
