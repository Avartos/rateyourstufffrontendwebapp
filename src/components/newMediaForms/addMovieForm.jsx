import {useState} from 'react';
import TextField from '@material-ui/core/TextField';

const AddMovieForm = () => {
    
    const [mediumName, setMediumName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [ageRestriction, setAgeRestriction] = useState('');
    const [mediumPoster, setMediumPoster] = useState('');
    const [languages, setLanguages] = useState('');
    const [genres, setGenres] = useState('');
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        let movie = {
            mediumName: mediumName,
            releaseDate: releaseDate,
            shortDescription: description,
            length: duration,
            ageRestriction: ageRestriction,
            languageStrings: languages.split(','),
            genreStrings: genres.split(',')
        }

        fetch('http://localhost:5000/rest/movies/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie),
        })
        .then(res => {
            if(!res.ok) {
                throw Error;
            }
            return res.json();
        })
        .then (data => {
            const formData = new FormData();
            formData.append('image', mediumPoster);
            fetch(`http://localhost:5000/rest/movies/images/${data.id}`, {
                method: 'POST',
                body: formData
            })
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            })
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    return ( 
        <form className="addMediaForm" onSubmit={(e) => handleSubmitForm(e)}>
            <input type="file" onChange={e => {setMediumPoster(e.target.files[0]); console.log(e.target.files[0])}}/>
            
            <span>Medium Name</span>
            <input type="text" required value={mediumName} onChange={(e) => {setMediumName(e.target.value)}}/>
            <span>Veröffentlichungsdatum</span>
            <input type="date" required value={releaseDate} onChange={(e) => {setReleaseDate(e.target.value)}}/>

            <span>Kurzbeschreibung</span>
            <textarea name="" id="" cols="30" rows="10" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>

            <span>Spieldauer (Minuten)</span>
            <input type="text" value={duration} onChange={(e) => {setDuration(e.target.value)}}/>

            <span>Altersfreigabe</span>
            <input type="text" value={ageRestriction} onChange={(e) => {setAgeRestriction(e.target.value)}}/>

            <span>Sprachen - Mit , trennen</span>
            <input type="text" value={languages} onChange={(e) => {setLanguages(e.target.value)}}/>

            <span>Genres - Mit , trennen</span>
            <input type="text" value={genres} onChange={(e) => {setGenres(e.target.value)}}/>
            <button>Submit</button>

        </form>
     );
}
 
export default AddMovieForm;