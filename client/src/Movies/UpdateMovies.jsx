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

  useEffect(() => {
    const editMovie = props.savedList.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });
    if (editMovie) {
      setMovie(editMovie);
    }
  }, [props.savedList, props.match.params.id]);

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.movies(res.data);
        props.history.push("/movies");
      })
      .catch(err => {
        console.error("UpdateMovies Error", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="stars"
          value={movie.stars}
        />
        <button className="button">Update</button>
      </form>
    </div>
  );
};
export default UpdateMovies;
