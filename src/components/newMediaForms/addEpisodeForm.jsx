import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultSelect from "../formComponents/defaultSelect";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";
import { useParams } from "react-router";

/**
 * This component is used to add a new component to the database
 * @param {*} param0
 * @returns
 */
const AddEpisodeForm = ({ handleAddMessage }) => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(0);

  const history = useHistory();
  const { id } = useParams();

  const [genreList, setGenreList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");

  const handleGenreSelect = (e) => {
    if (e.target.value.length <= 5) {
      setGenres(e.target.value);
    }
  };

  const fetchData = (targetUrl, title, setter) => {
    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Unable to fetch ${title}`);
        }
        return res.json();
      })
      .then((data) => {
        setter(data);
      })
      .catch((err) => {
        handleAddMessage("error", "Fehler", err.message);
        console.error(err);
      });
  };

  const handleLanguageSelect = (e) => {
    if (e.target.value.length <= 15) {
      setLanguages(e.target.value);
    }
  };

  useEffect(() => {
    fetchData(
      "http://localhost:5000/rest/languages/all",
      "languages",
      setLanguageList
    );
    fetchData("http://localhost:5000/rest/genres/all", "genres", setGenreList);
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let episode = {
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      length: duration,
      languageStrings: languages,
      genreStrings: genres,
      seasonMappingId: id,
      episodeNumber: episodeNumber,
    };

    fetch("http://localhost:5000/rest/episodes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(episode),
    })
      .then((res) => {
        if (res.status === 418) {
          throw Error("Das Medium existiert bereits");
        } else if (!res.ok) {
          throw Error("Unbekannter Fehler beim Anlegen des Mediums");
        }
        return res.json();
      })
      .then((data) => {
        if (mediumPoster) {
          const formData = new FormData();
          formData.append("image", mediumPoster);
          fetch(`http://localhost:5000/rest/episodes/images/${data.id}`, {
            method: "POST",
            headers: {
              Authorization: sessionStorage.getItem("Bearer "),
            },
            body: formData,
          })
            .then((response) => {
              handleAddMessage(
                "success",
                "Episode angelegt",
                "Die neue Episode wurde erfolgreich angelegt."
              );
              history.push(`/detail/episode/${data.id}`);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          handleAddMessage(
            "success",
            "Episode angelegt",
            "Die neue Episode wurde erfolgreich angelegt."
          );
          history.push(`/detail/episode/${data.id}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 >= 3000) {
      handleAddMessage(
        "error",
        "Fehler",
        "Bilder d??rfen eine Dateigr????e von 3MB nicht ??berschreiten!"
      );
    } else if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      handleAddMessage(
        "error",
        "Fehler",
        "Bitte laden Sie nur .jpg oder .png Dateien hoch!"
      );
    } else {
      setCurrentImage(URL.createObjectURL(event.target.files[0]));
      setMediumPoster(event.target.files[0]);
    }
  };

  return (
    <form className="addMediaForm" onSubmit={(e) => handleSubmitForm(e)}>
      <span className="label">Poster</span>
      <ImagePreview currentImage={currentImage} />
      <input
        type="file"
        onChange={(e) => {
          handleSelectImage(e);
          
        }}
      />

      <DefaultTextField
        title="Episodentitel"
        value={mediumName}
        setter={setMediumName}
      />

      <DefaultTextField
        title="Episodennummer"
        value={episodeNumber}
        setter={setEpisodeNumber}
        type="number"
      />

      <DefaultTextField
        title="Ver??ffentlicht am"
        value={releaseDate}
        setter={setReleaseDate}
        type="date"
      />

      <DefaultTextField
        title="Kurzbeschreibung"
        value={description}
        setter={setDescription}
        additionalOptions={{ multiline: true, rows: "10" }}
      />

      <DefaultTextField
        title="Spieldauer (Minuten)"
        value={duration}
        setter={setDuration}
        type="number"
      />

      <DefaultSelect
        title="Sprachen"
        inputList={languageList.map((language) => {
          return { id: languageList.id, title: language.language };
        })}
        targetValue={languages}
        setter={handleLanguageSelect}
      />
      <DefaultSelect
        title="Genres"
        inputList={genreList.map((genre) => {
          return { id: genre.id, title: genre.genreName };
        })}
        targetValue={genres}
        setter={handleGenreSelect}
        chipColor="secondary"
        chipOutline="outlined"
      />

      <Button variant="contained" color="primary" type="submit">
        Episode hinzuf??gen
      </Button>
    </form>
  );
};

export default AddEpisodeForm;
