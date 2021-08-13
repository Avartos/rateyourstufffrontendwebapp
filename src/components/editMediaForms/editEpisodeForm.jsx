import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultSelect from "../formComponents/defaultSelect";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";
import { useParams } from "react-router";

const EditEpisodeForm = () => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(0);
  const [picturePath, setPicturePath] = useState("");
  const [seasonId, setSeasonId] = useState("");

  const history = useHistory();
  const { id } = useParams();

  const [genreList, setGenreList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");

  const [seriesTitle, setSeriesTitle] = useState('');

  const fetchEpisode = () => {
    fetch(`http://localhost:5000/rest/episodes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("unable to fetch episode");
        }
        return res.json();
      })
      .then((data) => {
        setMediumName(data.mediumName);
        setReleaseDate(data.releaseDate);
        setCurrentImage(`http://localhost:5000/${data.picturePath}`);
        setDescription(data.shortDescription);
        setLanguages(data.languages);
        setGenres(data.genres);
        setPicturePath(data.picturePath);
        setCurrentImage(`http://localhost:5000/${data.picturePath}`);
        setSeasonId(data.seasonId);
        setEpisodeNumber(data.episodeNumber);
        setDuration(data.length);
        setSeriesTitle(data.seriesTitle);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        history.push("/not_found");
      });
  };

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
        console.error(err);
      });
  };

  const handleLanguageSelect = (e) => {
    if (e.target.value.length <= 15) {
      setLanguages(e.target.value);
    }
  };

  useEffect(() => {
    fetchEpisode();
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
      id: id,
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      length: duration,
      languageStrings: languages,
      genreStrings: genres,
      seasonMappingId: seasonId,
      episodeNumber: episodeNumber,
      picturePath: picturePath,
    };

    fetch("http://localhost:5000/rest/episodes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(episode),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((data) => {
        if (mediumPoster) {
          const formData = new FormData();
          formData.append("image", mediumPoster);
          fetch(`http://localhost:5000/rest/episodes/images/${data.id}`, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              history.push(`/detail/episode/${data.id}`);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectImage = (event) => {
    setCurrentImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <form className="addMediaForm" onSubmit={(e) => handleSubmitForm(e)}>
      <h2>{`${seriesTitle} >> Staffel ${seasonId}`}</h2>
      
      <span className="label">Poster</span>
      <ImagePreview currentImage={currentImage} />
      <input
        type="file"
        onChange={(e) => {
          handleSelectImage(e);
          setMediumPoster(e.target.files[0]);
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
        Episode aktualisieren
      </Button>
    </form>
  );
};

export default EditEpisodeForm;