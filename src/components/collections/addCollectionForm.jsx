import helper from "../../core/helper";
import DefaultTextField from "../formComponents/defaultTextField";
import { useState } from "react";
import { Button } from "@material-ui/core";

const AddCollectionForm = ({ handleSetFormVisible }) => {
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
      },
      body: JSON.stringify(collection),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to add new collection");
        }
      })
      .then(() => {
        // handleSetFormVisible(false);
      })
      .catch((err) => {
        console.error(err);
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
