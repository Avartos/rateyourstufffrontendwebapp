import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DefaultTextField from "../formComponents/defaultTextField";
import DefaultCheckBox from "../formComponents/defaultCheckBox";
import DefaultSelect from "../formComponents/defaultSelect";
import DefaultAutoComplete from "../formComponents/defaultAutoComplete";
import { Button } from "@material-ui/core";
import ImagePreview from "../formComponents/imagePreview";

const AddBookForm = () => {
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
          headers: {
            Authorization: sessionStorage.getItem("Bearer "),
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw Error("An error occured while uploading the image");
            }
            history.push(`/detail/book/${data.id}`);
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

      <DefaultTextField title="ISBN" value={isbn} setter={setISBN} />

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
