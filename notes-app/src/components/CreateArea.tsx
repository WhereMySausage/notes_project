import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

export interface INote {
    title: string,
    content: string, 
} 

interface ICreateArea {
    onAdd: (newNote: INote) => void,
}

function CreateArea({ onAdd }: ICreateArea) {
    const [note, setNote] = useState<INote>({
        title: "",
        content: "", 
    });

    function handleChange(e: { target: { name: string; value: string; }; }) {
        const { name, value } = e.target;
    setNote((preValue) => {
        return {
            ...preValue,
            [name]: value,
        };
    });
    }

        function submitButton(event: { preventDefault: () => void; }) {
            setNote({
                title: "",
                content: "",
            });
            onAdd(note);
            event.preventDefault();
        }        
    
return (
    <div>
        <form name='form1'>
            <input value={note.title} type="text"  placeholder='Title' name="title" onChange={handleChange}/> 
                <p>
                    <textarea value={note.content} name="content" placeholder="Take a note..." onChange={handleChange} />
                </p>   
            <button onClick={submitButton}><IoMdAdd size={25} /></button>
        </form>
    </div>
);
}

export default CreateArea;



