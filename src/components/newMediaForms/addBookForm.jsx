import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { FormControlLabel } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

const AddBookForm = () => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setISBN] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const history = useHistory();
  const [publisherList, setPublisherList] = useState([]);
  const [publisher, setPublisher] = useState();
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isEbook, setIsEbook] = useState(false);
  const [isPrint, setIsPrint] = useState(false);

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

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
    fetchPublishers();
  }, []);

  // console.log(publisher);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let book = {
      mediumName: mediumName,
      releaseDate: releaseDate,
      shortDescription: description,
      length: isbn,
      numberOfPages: numberOfPages,
      languageStrings: languages,
      genreStrings: genres,
      publisherString: publisher,
      isEBook: isEbook,
      isPrint: isPrint,
      isbn: isbn,
    };

    fetch("http://localhost:5000/rest/books/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
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
        fetch(`http://localhost:5000/rest/books/images/${data.id}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if(!response.ok) {
              throw Error ('An error occured while uploading the image');
            }
            history.push(`/detail/book/${data.id}`);
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

  const fetchPublishers = () => {
    fetch("http://localhost:5000/rest/bookPublishers/all")
      .then((res) => {
        if (!res.ok) {
          throw Error("Unable to retrieve book publishers");
        }
        return res.json();
      })
      .then((data) => {
        setPublisherList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form
      className="addMediaForm formControl"
      onSubmit={(e) => handleSubmitForm(e)}
    >
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

      <span className="label">Buchtitel</span>
      <TextField
        required
        value={mediumName}
        onChange={(e) => {
          setMediumName(e.target.value);
        }}
        fullWidth
        variant="filled"
      />

      <span className="label">Veröffentlichungsdatum</span>
      <TextField
        type="date"
        required
        value={releaseDate}
        onChange={(e) => {
          setReleaseDate(e.target.value);
        }}
        fullWidth
        variant="filled"
      />

      <span className="label">Kurzbeschreibung</span>
      <TextField
        multiline
        rows="10"
        fullWidth
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        variant="filled"
      />

      <span className="label">ISBN</span>
      <TextField
        value={isbn}
        onChange={(e) => {
          setISBN(e.target.value);
        }}
        fullWidth
        variant="filled"
      />

      <span className="label">Seitenanzahl</span>
      <TextField
        value={numberOfPages}
        fullWidth
        onChange={(e) => {
          setNumberOfPages(e.target.value);
        }}
      />

      <FormControl component="fieldset">
      <FormControlLabel
          value="Als eBook veröffentlicht"
          control={<Checkbox checked={isEbook} onChange={() => {setIsEbook(!isEbook)}} color="secondary" />}
          label="Als eBook veröffentlicht"
          labelPlacement="start"
          fullwidth
        />
      </FormControl>
      <FormControl component="fieldset">
      <FormControlLabel
          value="Als Printausgabe veröffentlicht"
          control={<Checkbox checked={isPrint} onChange={() => {setIsPrint(!isPrint)}} color="secondary" />}
          label="Als Printausgabe veröffentlicht"
          labelPlacement="start"
          fullwidth
        />
      </FormControl>

      <FormControl className="formControl">
        <span className="label">Sprachen</span>
        <Select
          multiple
          value={languages}
          input={<Input />}
          variant="filled"
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
          variant="filled"
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

      <span className="label">Verlag</span>
      <Autocomplete
        id="combo-box-demo"
        options={publisherList.map((publisher) => publisher.bookPublisherTitle)}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField variant="filled" {...params} fullwidth onChange={(e) => {setPublisher(e.target.value); console.log(e.target.value)}}/>
        )}
        freeSolo
        fullwidth
        onChange={(e, value) => setPublisher(value)}

      />
      <button>Submit</button>
    </form>
  );
};

export default AddBookForm;
