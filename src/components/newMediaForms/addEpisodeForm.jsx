import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultSelect from "../formComponents/defaultSelect";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";
import { useParams } from "react-router";

const AddEpisodeForm = () => {
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
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((data) => {
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
            history.push(`/detail/episode/${data.id}`);
          })
          .catch((error) => {
            console.error(error);
          });
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
        Episode hinzufügen
      </Button>
    </form>
  );
};

export default AddEpisodeForm;
