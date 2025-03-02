import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial);

    //get all Note

    const getNote = async () => {

        //Api call
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setnotes(json);

    }



    //Add a Note
    const addNote = async (title, description, tag) => {

        //Api call
        // eslint-disable-next-line no-unused-vars
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // console.log(response);
        // console.log("Adding a new node");
        const note = {
            "_id": "67aefe1977b0d74ec800324e8d",
            "user": "67a31508164260093d645e74",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-02-14T08:26:01.354Z",
            "__v": 0
        };
        setnotes(notes.concat(note))
    }

    //Delete a Node
    const deleteNote = async (id) => {

        //Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // eslint-disable-next-line no-unused-vars
        const json = response.json();
        // console.log(json);
        // console.log("Deleting the node with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)
    }

    //Edit a Node
    const editNote = async (id, title, description, tag) => {
        //Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line no-unused-vars
        const json = response.json();
        // console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))

        //logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;