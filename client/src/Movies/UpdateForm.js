//Movie list:
// 1. has movie data set to state
// 2. Passes movie data through props to <MovieDetails/>
// 3. Movie Details returns <MovieCard/> and passes it props
//      It also links to The individual movies when they are clicked on


//Movie Card: 
// 1. Takes props from MovieDetails, deconstructs them and makes cards for each movie


//Seperate chain:

//Movie component 
// 1. is passed props from app including saved list state and addToSavedList function
// 2. has 4 functions:
//      1. fetchMovie: passes in id of movie that is clicked on and renders it the screen
//      2. componentDidMount: insures that fetchMovie runs when when the component mounts
//      3. componentWillReceiveProps: When save button is clicked within a movie.. ask izzy
//      4. saveMovie: adds movies to the state of savedList in app.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: "", //may take this out
    title: "",
    director: "",
    metascore: "",
    stars: []
  };

const UpdateForm = props => {
    console.log('updateForm props', props);
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);
        console.log('movie to update', movieToUpdate);

        if(movieToUpdate){
            setMovie(movieToUpdate);
        }

    }, [props.movies, id]);



    // const changeHandler = e => {
    //     setMovie({
    //         title: e.target.value,
    //         director: e.target.value,
    //         metascore: e.target.value,
    //         stars: e.target.value
    //     })
    // }

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    };



    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
            console.log(res);
            props.history.push('/');
            // axios.get('http://localhost:5000/api/movies') //2nd console.log was used to 
            // .then(res => console.log(res))
            // .catch(err => console.log(err))
          })
          .catch(err => console.log(err));
      };



    return (
        <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={movie.title}
            />

            <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={movie.director}
            />

            <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={movie.metascore}
            />

            <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="stars"
            value={movie.stars}
            />
            <button>Make Changes</button>
          </form>
        </div>
    )
}  

export default UpdateForm;

