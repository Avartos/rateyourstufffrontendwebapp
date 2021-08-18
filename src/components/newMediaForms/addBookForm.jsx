import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultCheckBox from "../formComponents/defaultCheckBox";
import DefaultSelect from "../formComponents/defaultSelect";
import DefaultAutoComplete from "../formComponents/defaultAutoComplete";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";
import isbnCheck from "../../core/isbnCheck";

/**
 * This Component is used to add a new book to the database
 * @param {*} param0 
 * @returns 
 */
const AddBookForm = ({ handleAddMessage }) => {
  const [mediumName, setMediumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setISBN] = useState("");
  const [mediumPoster, setMediumPoster] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const history = useHistory();
  const [publisherList, setPublisherList] = useState([]);
  const [publisher, setPublisher] = useState();
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isEbook, setIsEbook] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

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
    fetchData(
      "http://localhost:5000/rest/bookPublishers/all",
      "publishers",
      setPublisherList
    );
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if(!isValidIsbn) {
      handleAddMessage('error', 'Fehler', 'Die eingegebene ISBN ist ungültig');
      return;
    }

    
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
        Authorization: sessionStorage.getItem("Bearer "),
      },
      body: JSON.stringify(book),
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
        const formData = new FormData();
        formData.append("image", mediumPoster);
        fetch(`http://localhost:5000/rest/books/images/${data.id}`, {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("Bearer "),
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw Error("Bildupload fehlgeschlagen");
            }
            handleAddMessage(
              "success",
              "Buch angelegt",
              "Das neue Buch wurde erfolgreich angelegt."
            );
            history.push(`/detail/book/${data.id}`);
          })
          .catch((error) => {
            handleAddMessage("error", "Fehler", error.message);
            console.error(error);
          });
      })
      .catch((error) => {
        handleAddMessage("error", "Fehler", error.message);
        console.error(error);
      });
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 >= 3000) {
      handleAddMessage(
        "error",
        "Fehler",
        "Bilder dürfen eine Dateigröße von 3MB nicht überschreiten!"
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
    }
  };

  const [isValidIsbn, setIsValidIsbn] = useState(false);

  const handleCheckIfISBNIsValid = (isbn) => {
    if (isbnCheck.isValidISBN10(isbn) || isbnCheck.isValidISBN13(isbn)) {
      setIsValidIsbn(true);
    } else {
      setIsValidIsbn(false);
    }
  };

  return (
    <form
      className="addMediaForm formControl"
      onSubmit={(e) => handleSubmitForm(e)}
    >
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
        title="Buchtitel"
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
        title="ISBN"
        value={isbn}
        isError={!isValidIsbn}
        helperText="Bitte gültige ISBN10 (Bsp.: 3-551-35405-7) oder ISBN13 (Bsp.: 978-3-5513-5405-1) eingeben"
        setter={(isbn) => {
          setISBN(isbn);
          handleCheckIfISBNIsValid(isbn);
        }}
      />

      <DefaultTextField
        title="Seitenanzahl"
        value={numberOfPages}
        setter={setNumberOfPages}
        type="number"
      />
      <DefaultCheckBox title="eBook" value={isEbook} setter={setIsEbook} />
      <DefaultCheckBox
        title="Printausgabe"
        value={isPrint}
        setter={setIsPrint}
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
      <DefaultAutoComplete
        title="Verlag"
        inputValues={publisherList.map(
          (publisher) => publisher.bookPublisherTitle
        )}
        setter={setPublisher}
        targetValue={publisher}
      />
      <Button variant="contained" color="primary" type="submit">
        Buch hinzufügen
      </Button>
    </form>
  );
};

export default AddBookForm;
