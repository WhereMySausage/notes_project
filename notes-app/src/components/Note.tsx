import { DragEvent, useState } from "react";
import { MdCheckBox, MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdPalette } from "react-icons/md";
import { INote } from "../models/note";

interface INotes {
  title: string;
  content: string;
  date: string;
  onDelete: (id: string) => void;
  id: string;
  onSort: (drag: number, drop: number) => void;
  index: number;
}

interface ITodo {
  check: boolean;
  text: string;
  index: number;
}

function Note({ title, content, date, onDelete, id, index, onSort }: INotes) {
  const [title1, setTitle] = useState<string>(title);
  const [content1, setContent] = useState<string>(content);
  const [isEditdisabled, setNameEdit] = useState<boolean>(true);
  const number = localStorage.getItem("color " + id);
  const [hex, setHex] = useState(number);
  const elem = localStorage.getItem("el" + id);
  const [autoGr, setautoGr] = useState(elem);

  let alltodoList = JSON.parse(localStorage.getItem("TodoList" + id) || "[]");
  let ob1: any
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
        newTodo.text = e.currentTarget.value;
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
    ob1 = e.currentTarget.dataset.index
    localStorage.setItem("ob1",ob1)
    console.log(`drag`, ob1);
    
  }

  function dragOverHandler(e: any) {
    e.preventDefault()
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, note: INote) {
    e.preventDefault()
    let ob2 = e.currentTarget.dataset.index|| ""
    let ob1 =localStorage.getItem("ob1") || ""
   
    const arr = JSON.parse(localStorage.getItem("notes") || "[]")
    
    console.log(arr);
    if (Number(ob1) !== Number(ob2)) {
      
      console.log(`drop1=` + ob1 + " drop2=" + ob2);
      let title1 = arr[ob1].title
      let content1 = arr[ob1].content
      let date1 = arr[ob1].date
      let id1 = arr[ob1].id

      let title2 = arr[ob2].title
      let content2 = arr[ob2].content
      let date2 = arr[ob2].date
      let id2 = arr[ob2].id 

      arr[ob2] = {
        title: title1,
        content: content1,
        date: date1,
        id: id1,
      }
      arr[ob1] = {
        title: title2,
        content: content2,
        date: date2,
        id: id2,
      }
   
      localStorage.setItem("notes", JSON.stringify(arr))
      localStorage.setItem("notesdef", JSON.stringify(arr))
      window.location.reload();      
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

    const filteredNotes = todoList.filter((todo) => todo.index !== i);
    setTodoList(filteredNotes);
    localStorage.setItem("TodoList" + id, JSON.stringify(filteredNotes));
    localStorage.setItem("TodoListdef" + id, JSON.stringify(filteredNotes));
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
            value={todo.text}
            maxLength={36}
            className="inp"
            placeholder="new paragraph..."
            onChange={(e) => textHandrel(e, i)}
          />
          <button className="addChBx" onClick={() => deleteTodo(i)}>
            -
          </button>
        </div>
      ))}
      <div></div>
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
