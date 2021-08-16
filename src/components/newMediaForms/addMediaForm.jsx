import React from "react";
import { Link } from "react-router-dom";

const AddMediaForm = () => {
  return (
    <div className="addMediaForm">
      <h1>Medium anlegen</h1>
      <p>Bitte wählen Sie aus, welches Medium Sie anlegen möchten!</p>
      <Link to="/add/movie">Neuen Film anlegen</Link>
      <Link to="/add/book">Neues Buch anlegen</Link>
      <Link to="/add/game">Neues Spiel anlegen</Link>
      <Link to="/add/series">Neue Serie anlegen</Link>
    </div>
  );
};

export default AddMediaForm;
