import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const AddMovieForm = () => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  const [genreList, setGenreList] = useState([]);

  const handleGenreSelect = (e) => {
    if (e.target.value.length <= 5) {
      setGenres(e.target.value);
    }
  };

  const fetchGenres = () => {
    fetch("http://localhost:5000/rest/genres/all")
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to fetch genres");
        }
        return res.json();
      })
      .then((data) => {
        setGenreList(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [languageList, setLanguageList] = useState([]);

  const fetchLanguages = () => {
    fetch("http://localhost:5000/rest/languages/all")
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to fetch languages");
        }
        return res.json();
      })
      .then((data) => {
        setLanguageList(data);
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

  const [networkList, setNetworkList] = useState([]);
  const [network, setNetwork] = useState(null);

  const fetchNetworks = () => {
    fetch("http://localhost:5000/rest/networks/all")
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to fetch networks");
        }
        return res.json();
      })
      .then((data) => {
        setNetworkList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
    fetchNetworks();
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let movie = {
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      length: duration,
      ageRestriction: ageRestriction,
      languageStrings: languages,
      genreStrings: genres,
      networkTitle: network,
    };

    fetch("http://localhost:5000/rest/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
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
        fetch(`http://localhost:5000/rest/movies/images/${data.id}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            history.push(`/detail/movie/${data.id}`);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [currentImage, setCurrentImage] = useState("");

  const handleSelectImage = (event) => {
    setCurrentImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <form className="addMediaForm" onSubmit={(e) => handleSubmitForm(e)}>
      
        <span className="label">Poster</span>
        <div className="imageWrapper">
          <img className="previewImage" src={currentImage} alt="Vorschau" />
        </div>
        <input
          type="file"
          onChange={(e) => {
            handleSelectImage(e);
            setMediumPoster(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />

        <span className="label">Filmtitel</span>
        <input
          type="text"
          required
          value={mediumName}
          onChange={(e) => {
            setMediumName(e.target.value);
          }}
        />
        <span className="label">Veröffentlichungsdatum</span>
        <input
          type="date"
          required
          value={releaseDate}
          onChange={(e) => {
            setReleaseDate(e.target.value);
          }}
        />

        <span className="label">Kurzbeschreibung</span>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>

        <span className="label">Spieldauer (Minuten)</span>
        <input
          type="text"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        />
      <FormControl className="formControl">
        <span className="label">Altersfreigabe</span>
        <Select
          key="0"
          value={ageRestriction}
          input={<Input />}
          renderValue={() => `ab ${ageRestriction}`}
          MenuProps={MenuProps}
          onChange={(e) => setAgeRestriction(e.target.value)}
        >
          <MenuItem value={0}>Ohne Altersbeschränkung</MenuItem>
          <MenuItem value={6}>Ab 6 Jahren</MenuItem>
          <MenuItem value={12}>Ab 12 Jahren</MenuItem>
          <MenuItem value={16}>Ab 16 Jahren</MenuItem>
          <MenuItem value={18}>Ab 18 Jahren</MenuItem>
        </Select>
        </FormControl>
        <FormControl className="formControl">
        <span className="label">Netzwerk</span>
        <Select
          value={network}
          input={<Input />}
          renderValue={() => network}
          MenuProps={MenuProps}
          onChange={(e) => setNetwork(e.target.value)}
        >
          {networkList.map((network) => {
            return (
              <MenuItem key={network.id} value={network.networkTitle}>
                {network.networkTitle}
              </MenuItem>
            );
          })}
        </Select>
        </FormControl>
        <FormControl className="formControl">
        <span className="label">Sprachen</span>
        <Select
          multiple
          value={languages}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  className={classes.chip}
                  color="primary"
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          onChange={handleLanguageSelect}
        >
          {languageList.map((language) => {
            return (
              <MenuItem key={language.id} value={language.language}>
                <Checkbox checked={languages.indexOf(language.language) > -1} />
                {language.language}
              </MenuItem>
            );
          })}
        </Select>
        </FormControl>

        <FormControl className="formControl">
        <span className="label">Genres</span>
        <Select
          multiple
          value={genres}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          onChange={handleGenreSelect}
        >
          {genreList.map((genre) => {
            return (
              <MenuItem key={genre.id} value={genre.genreName}>
                <Checkbox checked={genres.indexOf(genre.genreName) > -1} />
                {genre.genreName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <button>Submit</button>
    </form>
  );
};

export default AddMovieForm;
