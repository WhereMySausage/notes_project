import React from "react";
import { MdDelete } from "react-icons/md";

interface INotes {
    title: string,
    content: string,
    onDelete: (id: number) => void,
    id: number,
}

function Notes({ title, content, onDelete, id}:INotes) {
    return (
        <div className="notes">
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={() => onDelete(id)}>
                <MdDelete size={20} />
            </button>
        </div>
    );
}

export default Notes;