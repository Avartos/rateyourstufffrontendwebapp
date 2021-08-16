import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultAutoComplete from "../formComponents/defaultAutoComplete";
import DefaultSelect from "../formComponents/defaultSelect";
import AgeSelect from "../formComponents/ageSelect";
import { Button } from "@material-ui/core";
import DefaultCheckBox from "../formComponents/defaultCheckBox";
import ImagePreview from "../formComponents/imagePreview";

const AddSeriesForm = () => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [averageLength, setAverageLength] = useState();

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
    fetchData(
      "http://localhost:5000/rest/networks/all",
      "networks",
      setNetworkList
    );
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let series = {
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      averageLength: averageLength,
      ageRestriction: ageRestriction,
      languageStrings: languages,
      genreStrings: genres,
      networkTitle: network,
      isCompleted: isCompleted,
    };

    fetch("http://localhost:5000/rest/series/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(series),
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
        fetch(`http://localhost:5000/rest/series/images/${data.id}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            history.push(`/detail/series/${data.id}`);
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
      <ImagePreview currentImage={currentImage}/>
      <input
        type="file"
        onChange={(e) => {
          handleSelectImage(e);
          setMediumPoster(e.target.files[0]);
        }}
      />

      <DefaultTextField
        title="Serientitel"
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
        title="Durschnittliche Episodendauer (Minuten)"
        value={averageLength}
        setter={setAverageLength}
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
      <DefaultCheckBox
        title="Abgeschlossen"
        value={isCompleted}
        setter={setIsCompleted}
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
        Serie hinzufügen
      </Button>
    </form>
  );
};

export default AddSeriesForm;
