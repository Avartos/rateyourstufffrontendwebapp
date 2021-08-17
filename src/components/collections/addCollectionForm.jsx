import helper from "../../core/helper";
import DefaultTextField from "../formComponents/defaultTextField";
import { useState } from "react";
import { Button } from "@material-ui/core";

const AddCollectionForm = ({ handleCloseForm, handleAddMessage }) => {
  const [title, setTitle] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const collection = {
      userMappingId: helper.getUserId(),
      title: title,
    };

    fetch(`http://localhost:5000/rest/collections/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(collection),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Fehler beim Hinzufügen der neuen Sammlung');
        }
      })
      .then(() => {
        handleCloseForm();
      })
      .catch((err) => {
        console.error(err);
        handleAddMessage('error', 'Fehler', err.message);
      });
  };

  return (
    <form action="" className="addMediaForm" onSubmit={handleSubmitForm}>
      <DefaultTextField
        title="CollectionBezeichnung"
        value={title}
        setter={setTitle}
      ></DefaultTextField>
      <Button type="submit">Collection anlegen</Button>
    </form>
  );
};

export default AddCollectionForm;
