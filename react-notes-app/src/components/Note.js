import React from "react";
import "../index.css";

function Note(props) {
  return (
    <div>
      <p className="note">{props.text}</p>
    </div>
  );
}

export default Note;
