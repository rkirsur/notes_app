import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import NewNote from './components/NewNote';

const notes = []

function App() {
  const [notesArray, setNotesArray] = useState(notes);

  function getNotes() {
    fetch("http://localhost:3001/api/notes")
      .then((response) => response.json())
      .then((data) => {
        let notesArr = []
        const notes = data.data.notes
        for (let i = 0; i < notes.length; i++) {
          notesArr.push(notes[i].text)
        }
        setNotesArray(notesArr);
      });
  }

  function postNotes(text) {
    fetch("http://localhost:3001/api/notes", {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json'
      },
      body: JSON.stringify({"text": text})
    })
  }

  useEffect(() => {getNotes()}, [])

  const addNewNote = (enteredText) => {
    postNotes(enteredText)
    setNotesArray(prevArray => [...prevArray, enteredText]);
  }

  function displayNotes() {
    if (notesArray.length === 0) {
      return <p>add a note!</p>;
    } else {
      return notesArray.map((n, index) => {
        return <Note text={n} key={index}/>;
      })
    }
  }

  return (
    <div>
      <h1>Note App</h1>
      <NewNote onNewNote={addNewNote}/>
      {displayNotes()}
    </div>
  );
}

export default App;
