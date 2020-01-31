import React from "react";
import axios from "axios";

import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  //When component mounts fetchMovie function runs with  
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

//ask izzy
  componentWillReceiveProps(newProps) {
    console.log('new props', newProps)
    console.log('old Props', this.props)
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  //passing in id and putting it in the http request
  //then sets state to the movies data
  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        this.setState({movie: res.data})
      })
      // .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };
  

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.history.push(`/update-form/${this.state.movie.id}`, this.state.id);
    console.log('Here!!!', this.state.movie.id);
  };

  handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(res => {
      console.log(res);
      this.props.history.push('/')
    })
    .catch(err => console.log(err))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button" onClick= {this.handleUpdate}>
          Update
        </div>
        <div className="delete-button" onClick={this.handleDelete}> Delete </div>
      </div>
    );
  }
}
