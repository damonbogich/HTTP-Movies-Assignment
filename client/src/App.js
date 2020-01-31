import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm'
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  //starting here:
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:5000/api/movies')
    .then(res => {
      console.log(res)
      setMovies(res.data);
    })
    .catch(err => console.log(err))
  }, [])

  //ending: here
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-form/:id" render={props => (
        <UpdateForm {...props} movies={movies} setMovies={setMovies} />
      )} 
      />
    </>
  );
};

export default App;
