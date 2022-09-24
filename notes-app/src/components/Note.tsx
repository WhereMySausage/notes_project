import { DragEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlinePalette } from "react-icons/md";
import { INote } from "../models/note";

interface INotes {
  title: string;
  content: string;
  date: string;
  onDelete: (id: string) => void;
  id: string;
  onSort: (drag: number) => void;
  index: number;
}

interface ITodo {
  check: boolean;
  text: string;
  index: number;
}

function Note({ title, content, date, onDelete, onSort, id, index }: INotes) {
  const [title1, setTitle] = useState<string>(title);
  const [content1, setContent] = useState<string>(content);
  const editel = localStorage.getItem("edit" + id) || "true";
  const [isEditdisabled, setNameEdit] = useState<boolean>(
    String(editel) === "true"
  );
  localStorage.setItem("edit" + id, isEditdisabled + "");
  const number = localStorage.getItem("color " + id);
  const [hex, setHex] = useState(number);
  const elem = localStorage.getItem("el" + id);
  const [autoGr, setautoGr] = useState(elem);

  const allobjects = localStorage.getItem("notes") || "[]";
  const amountobj = allobjects.split(",").length / 4;

  let InputOutputJson = JSON.parse(allobjects);
  for (let i = 1; i <= amountobj; i++) {
    if (InputOutputJson[i - 1].id === id) {
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

  let alltodoList = JSON.parse(localStorage.getItem("TodoList" + id) || "[]");
  let ob1: any;
  if (alltodoList + "" === "") {
    alltodoList = [{ text: "", check: false, index: 0 }];
  }

  const [todoList, setTodoList] = useState<ITodo[]>(alltodoList);

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
      "#444242",
    ];
    const randomColor = Math.floor(Math.random() * coloR.length);
    localStorage.setItem("color " + id, coloR[randomColor]);
    setHex(coloR[randomColor]);
  };

  function checkHandrel(e: any, i: number) {
    const newTodoList = todoList.map((todo, index) => {
      const newTodo = { ...todo };
      if (index === i) {
        newTodo.check = e.currentTarget.checked;
      }
      return newTodo;
    });
    setTodoList(newTodoList);
    localStorage.setItem("TodoList" + id, JSON.stringify(newTodoList));
  }

  function textHandrel(e: any, i: number) {
    const value = e.currentTarget.value;

    const newTodoList = todoList.map((todo, index) => {
      const newTodo = { ...todo };
      if (index === i) {
        newTodo.text = value;
      }
      return newTodo;
    });

    if (value.length && newTodoList[newTodoList.length - 1].text.length) {
      newTodoList.push({ text: "", check: false, index: 0 });
    }
    setTodoList(newTodoList);
    localStorage.setItem("TodoList" + id, JSON.stringify(newTodoList));
    localStorage.setItem("TodoListdef" + id, JSON.stringify(newTodoList));
  }

  const note = { title, content, date, id };

  function dragStartHandler(e: any) {
    ob1 = e.currentTarget.dataset.index;
    localStorage.setItem("ob1", ob1);
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, note: INote) {
    e.preventDefault();
    let ob2 = e.currentTarget.dataset.index || "";
    let ob1 = localStorage.getItem("ob1") || "";

    let arr = JSON.parse(localStorage.getItem("notes") || "[]");

    if (Number(ob1) !== Number(ob2)) {
      if (localStorage.getItem("notesdef") === localStorage.getItem("notes")) {
        let title1 = arr[ob1].title;
        let content1 = arr[ob1].content;
        let date1 = arr[ob1].date;
        let id1 = arr[ob1].id;

        let title2 = arr[ob2].title;
        let content2 = arr[ob2].content;
        let date2 = arr[ob2].date;
        let id2 = arr[ob2].id;

        arr[ob2] = {
          title: title1,
          content: content1,
          date: date1,
          id: id1,
        };
        arr[ob1] = {
          title: title2,
          content: content2,
          date: date2,
          id: id2,
        };
        onSort(arr);
      }
    }
  }

  function deleteTodo(i: number): void {
    for (let i = 0; i < todoList.length; i++) {
      const text = todoList[i].text;
      const check = todoList[i].check;
      todoList[i] = {
        text: text,
        check: check,
        index: i,
      };
    }
    if (i !== 0) {
      const filteredNotes = todoList.filter((todo) => todo.index !== i);
      setTodoList(filteredNotes);
      localStorage.setItem("TodoList" + id, JSON.stringify(filteredNotes));
      localStorage.setItem("TodoListdef" + id, JSON.stringify(filteredNotes));
    } else {
      const firstTodoList = todoList.map((todo, index) => {
        const newTodo = { ...todo };
        if (index === i) {
          newTodo.text = "";
        }
        return newTodo;
      });

      localStorage.setItem("TodoList" + id, JSON.stringify(firstTodoList));
      localStorage.setItem("TodoListdef" + id, JSON.stringify(firstTodoList));
      setTodoList(firstTodoList);
    }
  }

  document.addEventListener("click", function (event: any) {
    if (event.target === document.querySelector("html")) {
      setNameEdit(false);
    }
  });

  const [file, setFile] = useState(localStorage.getItem("img" + id) + "");
  function handleChange(e: any) {
    let file = e.target.files[0];

    if (e.target.files && file) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        localStorage.setItem("img" + id, e.target.result);
        setFile(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div
      data-index={index}
      className="note"
      style={{ backgroundColor: `${hex}` }}
      onDragStart={(e) => dragStartHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, note)}
      draggable={true}
    >
      <input
        style={{ backgroundColor: `${hex}` }}
        placeholder="Title" 
        maxLength={20}
        value={title1}
        disabled={String(localStorage.getItem("edit" + id)) === "false"}
        onChange={(event) => setTitle(event.target.value)}
      ></input>

      <textarea
        style={{ backgroundColor: `${hex}`, height: `${autoGr}` }}
        placeholder="take a note..."
        disabled={String(localStorage.getItem("edit" + id)) === "false"}
        maxLength={500}
        onInput={autoGrow}
        value={content1}
        onChange={(event) => {
          setContent(event.target.value);
        }}
      ></textarea>
      <hr />
      {todoList.map((todo, i) => (
        <div className="todo">
          <input
            checked={todo.check}
            className="box"
            type="checkbox"
            onChange={(e) => checkHandrel(e, i)}
          />
          <textarea
            style={{ backgroundColor: `${hex}` }}
            value={todo.text}
            maxLength={36}
            className="inp"
            placeholder="new paragraph..."
            onChange={(e) => textHandrel(e, i)}
          />
          <button className="delChBx" onClick={() => deleteTodo(i)}>
            -
          </button>
        </div>
      ))}
      <input
        id={"file" + index}
        accept=".png, .jpg, .jpeg"
        className="selecT"
        type="file"
        onChange={handleChange}
        hidden
      />
      <label htmlFor={"file" + index}>Select File</label>
      <img id={"image" + index} alt="" src={file} width="228px" height="auto" />

      <div className="nav">
        <p>{date}</p>
        <button title="delete" className="delBtn" onClick={() => onDelete(id)}>
          <FiTrash size={20} />
        </button>
        <button
          className="editBtn"
          title="edit"
          onClick={() => {
            setNameEdit(!isEditdisabled);
          }}
        >
          {String(localStorage.getItem("edit" + id)) === "true" ? (
            <FiCheck title="save" color="#66FF00" size={20} />
          ) : (
            <FiEdit2 size={20} />
          )}
        </button>

        <button className="paletteBtn" title="palette" onClick={randomizedHex}>
          <MdOutlinePalette size={20} />
        </button>
      </div>
    </div>
  );
}

export default Note;
