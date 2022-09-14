import { useState } from "react";
import { MdCheckBox, MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdPalette } from "react-icons/md";
interface INotes {
  title: string;
  content: string;
  date: string;
  onDelete: (id: string) => void;
  id: string;
}

function Note({ title, content, date, onDelete, id }: INotes) {
  const [title1, setTitle] = useState<string>(title);
  const [content1, setContent] = useState<string>(content);
  const [isEditdisabled, setNameEdit] = useState<boolean>(true);
  const number = localStorage.getItem("color " + id);
  const [hex, setHex] = useState(number);
  const elem = localStorage.getItem("el" + id);
  const [autoGr, setautoGr] = useState(elem);
  const [drag, setDrag] = useState(true);

  function autoGrow(element: any) {
    element.target.style.height = "20px";
    element.target.style.height = element.target.scrollHeight + "px";
    localStorage.setItem("el" + id, element.target.style.height);
    setautoGr(element.target.style.height);
  }

  const randomizedHex = () => {
    const coloR = [
      "#FFFF00",
      "#7FFFD4",
      "#FF00FF",
      "#D2B48C",
      "#DAA520",
      "#8B4513",
      "#778899",
      "#808000",
      "#2F4F4F",
    ];
    const randomColor = Math.floor(Math.random() * coloR.length);
    localStorage.setItem("color " + id, coloR[randomColor]);
    setHex(coloR[randomColor]);
  };

  function edit() {
    const allobjects = localStorage.getItem("notes") || "[]";
    const amountobj = allobjects.split(",").length / 4;

    let InputOutputJson = JSON.parse(allobjects);
    for (let i = 1; i <= amountobj; i++) {
      if (JSON.parse(allobjects)[i - 1].id !== id) {
      } else {
        InputOutputJson[i - 1] = {
          title: title1,
          content: content1,
          date: date,
          id: id,
        };

        localStorage.setItem("notes", JSON.stringify(InputOutputJson));
        localStorage.setItem("seraching", JSON.stringify(InputOutputJson));
        localStorage.setItem("notesdef", JSON.stringify(InputOutputJson));
      }
    }
  }

  function dragStartHandler(e: any) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e: any) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: any) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log(files);
    setDrag(false);
  }

  return (
    <div
      className="note"
      style={{ backgroundColor: `${hex}` }}
      draggable={true}
    >
      <input
        style={{ backgroundColor: `${hex}` }}
        placeholder="Title"
        maxLength={20}
        value={title1}
        disabled={isEditdisabled}
        onChange={(event) => setTitle(event.target.value)}
      ></input>

      <textarea
        style={{ backgroundColor: `${hex}`, height: `${autoGr}` }}
        placeholder="take a note..."
        disabled={isEditdisabled}
        maxLength={500}
        onInput={autoGrow}
        value={content1}
        onChange={(event) => {
          setContent(event.target.value);
        }}
      ></textarea>
      <div className="todo">
        <input className="box" type="checkbox" />
        <input className="inp" type="text" />
        <button className="addChBx">+</button>
      </div>
      <div>
        {drag ? (
          <div
            className="drop-area"
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            отпустите файл
          </div>
        ) : (
          <div
            className="drop-area"
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            перетащите файл
          </div>
        )}
      </div>
      <p>{date}</p>
      <button className="delBtn" onClick={() => onDelete(id)}>
        <MdDelete size={20} />
      </button>
      <button
        className="editBtn"
        onClick={() => {
          setNameEdit(!isEditdisabled);
          edit();
        }}
      >
        {isEditdisabled ? (
          <MdEdit size={20} />
        ) : (
          <MdCheckBox color="#66FF00" size={20} />
        )}
      </button>
      <button className="paletteBtn" onClick={randomizedHex}>
        <MdPalette size={18} />
      </button>
    </div>
  );
}

export default Note;
