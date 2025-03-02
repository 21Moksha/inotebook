import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Note Added successfully","success");
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }    
    return (
        <div>
            <div className="container my-3">
                <h2>Add Notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
