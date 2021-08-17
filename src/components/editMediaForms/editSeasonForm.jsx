import React, { useState, useEffect } from "react";
import DefaultTextField from "../formComponents/defaultTextField";
import { Button } from "@material-ui/core";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const EditSeasonForm = () => {
  const [seasonTitle, setSeasonTitle] = useState("");
  const [seasonNumber, setSeasonNumber] = useState(0);
  const [seriesId, setSeriesId] = useState();
  const { id } = useParams();
  const history = useHistory();

  const fetchSeasonData = () => {
    fetch(`http://localhost:5000/rest/seasons/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to fetch season");
        }
        return res.json();
      })
      .then((data) => {
        setSeasonTitle(data.seasonTitle);
        setSeasonNumber(data.seasonNumber);
        setSeriesId(data.mediumId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddSeason = (e) => {
    e.preventDefault();

    const season = {
      id: id,
      seasonNumber: seasonNumber,
      seasonTitle: seasonTitle,
      seriesMappingId: seriesId,
    };

    fetch("http://localhost:5000/rest/seasons", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(season),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to add new Season");
        }
      })
      .then(() => {
        history.push(`/detail/series/${seriesId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSeasonData();
  }, []);

  return (
    <form action="" className="addMediaForm" onSubmit={handleAddSeason}>
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
        Staffel aktualisieren
      </Button>
    </form>
  );
};

export default EditSeasonForm;
