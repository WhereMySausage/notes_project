import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import {MdPalette} from "react-icons/md";

interface INotes {
    title: string,
    content: string,
    onDelete: (id: number) => void,
    onEdit: (id: number) => void,
    id: number,
}


function Notes({ title, content, onDelete, onEdit, id}:INotes) {
    return (
        <div className="notes">
            <h1>{title}</h1>
            <p>{content}</p>
                <button className = "delBtn" onClick={() => onDelete(id)}>
                    <MdDelete size={20} />
                </button>
                <button className = "editBtn" onClick={() => onEdit(id)}>
                    <MdEdit size={20} />
                </button>
                <button className="paletteBtn" >
                    < MdPalette />
                </button>
        </div>
    );
}

export default Notes;