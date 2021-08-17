import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultAutoComplete from "../formComponents/defaultAutoComplete";
import DefaultSelect from "../formComponents/defaultSelect";
import AgeSelect from "../formComponents/ageSelect";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";

const AddGameForm = () => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  const [genreList, setGenreList] = useState([]);
  const [networkList, setNetworkList] = useState([]);
  const [network, setNetwork] = useState(null);
  const [languageList, setLanguageList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [platformList, setPlatformList] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [averagePlaytime, setAveragePlaytime] = useState(0);
  const [minNumberOfPlayers, setMinNumberOfPlayers] = useState(1);
  const [maxNumberOfPlayers, setMaxNumberOfPlayers] = useState(1);

  const [publisherList, setPublisherList] = useState([]);
  const [publisher, setPublisher] = useState("");

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

  const handlePlatformSelect = (e) => {
    if (e.target.value.length <= 15) {
      setPlatforms(e.target.value);
    }
  };

  useEffect(() => {
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
    fetchData(
      "http://localhost:5000/rest/platforms/all",
      "platforms",
      setPlatformList
    );
    fetchData(
      "http://localhost:5000/rest/gamePublisher/all",
      "publisher",
      setPublisherList
    );
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let game = {
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      averagePlaytime: duration,
      ageRestriction: ageRestriction,
      languageStrings: languages,
      genreStrings: genres,
      networkTitle: network,
      platformStrings: platforms,
      minNumberOfGamers: minNumberOfPlayers,
      maxNumberOfGamers: maxNumberOfPlayers,
      publisherTitle: publisher,
    };

    fetch("http://localhost:5000/rest/games/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(game),
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
        fetch(`http://localhost:5000/rest/games/images/${data.id}`, {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("Bearer "),
          },
          body: formData,
        })
          .then((response) => {
            history.push(`/detail/game/${data.id}`);
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
        title="Spieltitel"
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
        title="Geschätzte Spieldauer (Minuten)"
        value={duration}
        setter={setDuration}
        type="number"
      />

      <DefaultTextField
        title="Minimale Anzahl an Spielern"
        value={minNumberOfPlayers}
        setter={setMinNumberOfPlayers}
        type="number"
      />

      <DefaultTextField
        title="Maximale Anzahl an Spielern"
        value={maxNumberOfPlayers}
        setter={setMaxNumberOfPlayers}
        type="number"
      />

      <AgeSelect
        title="Altersfreigabe"
        value={ageRestriction}
        setter={setAgeRestriction}
      />

      <DefaultAutoComplete
        title="Publisher"
        inputValues={publisherList.map(
          (publisher) => publisher.gamePublisherTitle
        )}
        setter={setPublisher}
        targetValue={publisher}
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

      <DefaultSelect
        title="Plattformen"
        inputList={platformList.map((platform) => {
          return { id: platform.id, title: platform.platformTitle };
        })}
        targetValue={platforms}
        setter={handlePlatformSelect}
        chipColor="secondary"
        chipOutline="outlined"
      />

      <Button variant="contained" color="primary" type="submit">
        Spiel hinzufügen
      </Button>
    </form>
  );
};

export default AddGameForm;
