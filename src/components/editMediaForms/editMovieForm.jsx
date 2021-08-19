import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultAutoComplete from "../formComponents/defaultAutoComplete";
import DefaultSelect from "../formComponents/defaultSelect";
import AgeSelect from "../formComponents/ageSelect";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";
import { useParams } from "react-router";

/**
 * This component can be used to edit a movie from the database
 * @param {*} param0 
 * @returns 
 */
const EditMovieForm = ({handleAddMessage}) => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const [genreList, setGenreList] = useState([]);
  const [networkList, setNetworkList] = useState([]);
  const [network, setNetwork] = useState(null);
  const [languageList, setLanguageList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [picturePath, setPicturePath] = useState("");

  const handleGenreSelect = (e) => {
    if (e.target.value.length <= 5) {
      setGenres(e.target.value);
    }
  };

  const fetchMovie = () => {
    fetch(`http://localhost:5000/rest/movies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch movie");
        }
        return res.json();
      })
      .then((data) => {
        setMediumName(data.mediumName);
        setReleaseDate(data.releaseDate);
        setCurrentImage(`http://localhost:5000/${data.picturePath}`);
        setDescription(data.shortDescription);
        setDuration(data.length);
        setAgeRestriction(data.ageRestriction);
        if (data.networkNetworkTitle) setNetwork(data.networkNetworkTitle);
        setLanguages(data.languages);
        setGenres(data.genres);
        setPicturePath(data.picturePath ? data.picturePath : '');
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        history.push("/not_found");
        console.error(error);
      });
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
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        console.error(error);
      });
  };

  const handleLanguageSelect = (e) => {
    if (e.target.value.length <= 15) {
      setLanguages(e.target.value);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchData(
      "http://localhost:5000/rest/languages/all",
      "languages",
      setLanguageList
    );
    fetchData("http://localhost:5000/rest/genres/all", "genres", setGenreList);
    fetchData(
      "http://localhost:5000/rest/networks/all",
      "networks",
      setNetworkList
    );
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let movie = {
      id: id,
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      length: duration,
      ageRestriction: ageRestriction,
      languageStrings: languages,
      genreStrings: genres,
      networkTitle: network,
    };

    if (picturePath) {
      movie.picturePath = picturePath;
    }

    fetch("http://localhost:5000/rest/movies", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(movie),
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
          fetch(`http://localhost:5000/rest/movies/images/${data.id}`, {
            method: "POST",
            headers: {
              Authorization: sessionStorage.getItem("Bearer "),
            },
            body: formData,
          })
            .then((response) => {
              handleAddMessage(
                "success",
                "Aktualisiert",
                "Der Film wurde aktualisiert"
              );
              history.push(`/detail/movie/${data.id}`);
            })
            .catch((error) => {
              handleAddMessage("error", "Fehler", error.message);
              console.error(error);
            });
        } else {
          handleAddMessage(
            "success",
            "Aktualisiert",
            "Der Film wurde aktualisiert"
          );
          history.push(`/detail/movie/${data.id}`);
        }
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        console.error(error);
      });
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if(file.size/1024 >= 3000) {
      handleAddMessage('error', 'Fehler', 'Bilder dürfen eine Dateigröße von 3MB nicht überschreiten!');
    } else if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
      handleAddMessage('error', 'Fehler', 'Bitte laden Sie nur .jpg oder .png Dateien hoch!');
    }
    else {
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
        title="Filmtitel"
        value={mediumName}
        setter={setMediumName}
      />
      <DefaultTextField
        title="Veröffentlicht am"
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

      <AgeSelect
        title="Altersfreigabe"
        value={ageRestriction}
        setter={setAgeRestriction}
      />

      <DefaultAutoComplete
        title="Netzwerk"
        inputValues={networkList.map((network) => network.networkTitle)}
        setter={setNetwork}
        targetValue={network}
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
        Film hinzufügen
      </Button>
    </form>
  );
};

export default EditMovieForm;
