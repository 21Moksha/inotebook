import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";
import AddNote from './AddNote';
const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useNavigate();
  const { notes, getNote, editNote } = context;
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const handleClick = (e) => {
    // console.log("Updating the node" , note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      getNote();
    } else {
      history("/login");
    }
  }, [getNote,history])
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} note={notes} />
        })}
      </div>
    </>
  )
}

export default Notes
