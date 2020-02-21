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

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${this.id}`)
      .then(res => {
        console.log(res);
        this.setState({ movie: res.data });
      })
      .catch(err => {
        console.log("Movie Error", err.response);
      });
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const handleDelete = e => {
      e.preventDefault();
      axios
        .delete(`http://localhost:5000/api/movies/${this.id}`)
        .then(res => {
          console.log(res);
          this.props.updateMovies(res.data);
          this.props.history.push("/");
        })
        .catch(err => {
          console.log("Movie Error", err);
        });
    };

    return (
      <div className="save-wrapper">
        {console.log("state", this.state)}
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button
          className="button"
          onClick={() => {
            this.props.history.push(`update-movies/${this.state.id}`);
          }}
        >
          Edit
        </button>
        <button className="save-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}
