import React, {useState} from "react";
import "../index.css";

function NewNote(props) {
  const [enteredText, setEnteredText] = useState('');
  const noteChangeHandler = (event) => {
    setEnteredText(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const note = enteredText;
    props.onNewNote(note);
    setEnteredText("");
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>New Note</label><br/>
        <input type="text" value={enteredText} onChange={noteChangeHandler}/>
      </div>
      <button>Create Note</button>
    </form>
  );
}

export default NewNote;
