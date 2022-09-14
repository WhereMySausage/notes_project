import { useState } from "react";
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

  return (
    <div>
      <form>
        {localStorage.getItem("val") === "" ? (
          <button
            disabled={false}
            onClick={(event) => {
              submitButton(event);
            }}
          >
            Add note
          </button>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
