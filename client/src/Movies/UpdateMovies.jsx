import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovies = props => {
  const [movie, setMovie] = useState(initialMovie);
  const [error, setError] = useState("");
  useEffect(() => {
    const movieToEdit = props.movies.find(
      movie => `${movie.id}` === props.match.params.id
    );

    if (movieToEdit) setMovie(movieToEdit);
  }, [props.movies, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.title === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.title]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.UpdateMovies(res.data);
        props.history.goBack();
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
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
          type="number"
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
        <button className="button">Update</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
export default UpdateMovies;
