import React, { useState, useEffect } from "react";
import DefaultTextField from "../formComponents/defaultTextField";
import { Button } from "@material-ui/core";

const AddSeasonForm = ({
  seriesId,
  handleHideSeasonForm,
  handleAddMessage,
}) => {
  const [seasonTitle, setSeasonTitle] = useState("");
  const [seasonNumber, setSeasonNumber] = useState(0);

  const handleAddSeason = (e) => {
    e.preventDefault();

    const season = {
      seasonNumber: seasonNumber,
      seasonTitle: seasonTitle,
      seriesMappingId: seriesId,
    };

    fetch("http://localhost:5000/rest/seasons/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(season),
    })
      .then((res) => {
        if (res.status === 418) {
          throw Error("Das Medium existiert bereits");
        } else if (!res.ok) {
          throw Error("Unbekannter Fehler beim Anlegen des Mediums");
        }
      })
      .then(() => {
        handleAddMessage(
          "success",
          "Staffel angelegt",
          "Die neue Staffel wurde erfolgreich angelegt."
        );
        handleHideSeasonForm(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form action="" onSubmit={handleAddSeason}>
      <h2>Neue Staffel hinzufügen</h2>
      <DefaultTextField
        title="Staffelname"
        value={seasonTitle}
        setter={setSeasonTitle}
        isRequired={false}
      />
      <DefaultTextField
        title="Staffelnummer"
        value={seasonNumber}
        setter={setSeasonNumber}
      />
      <Button variant="contained" color="primary" type="submit">
        Staffel hinzufügen
      </Button>
    </form>
  );
};

export default AddSeasonForm;
