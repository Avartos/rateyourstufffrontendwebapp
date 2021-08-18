import React from "react";
import { Link } from "react-router-dom";

/**
 * This component is used to show a list of all mediatypes that can be added
 * @returns
 */
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
