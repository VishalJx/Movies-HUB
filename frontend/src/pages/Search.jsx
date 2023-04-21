import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

function Search() {
  const [movieId, setMovieId] = useState('');
  const [movie, setMovie] = useState(null);

  const notify = (message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const fetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getMovie/${movieId}`);
      const data = await response.json();
      if (data.error) {
        notify(data.error, 'error');
      } else {
        setMovie(data);
        notify('Movie fetched successfully!', 'success');
      }
    } catch (error) {
      notify('Error fetching movie', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovie();
  };

  return (
    <Container>
      <h1>Get Movie by ID</h1>
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="Enter movie ID"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
          />
          <button type="submit">Get Movie</button>
        </form>
      </div>
      <div>
        <button id="show-all"><Link to='/getAll' style={{textDecoration:"none", color:"white"}}>Show All Movies</Link></button>
      </div>
      {movie && (
        <div className="movie-details">
          <p>
            <strong>Movie: </strong>{movie.title}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background-color: #00337c;
    padding: 1rem;
    border-radius: 0.7rem;
    margin-top: 1.3rem;

    input {
      width: 25rem;
      padding: 0.5rem;
      border-radius: 0.3rem;
      border: none;
      outline: none;
      font-size: 1.2rem;
    }

    button {
      font-size: 1.2rem;
      font-weight: 600;
      padding: 0rem 0.7rem;
      background-color: #e96479;
      border: none;
      color: white;
      border-radius: 0.3rem;
    }
    button:hover {
      background-color: #dd0d58;
      border-radius: 0.5rem;
      transition: 0.2s;
    }
  }

  .movie-details {
    background-color: #00337c;
    color: white;
    padding: 1rem;
    border-radius: 0.7rem;
    margin-top: 1.3rem;
    h2 {
      margin-top: 0;
    }
    p {
      margin-bottom: 0.5rem;
    }
    }
  }
  #show-all {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0rem 0.7rem;
    background-color: #e96479;
    border: none;
    color: white;
    border-radius: 0.3rem;
  }
  #show-all:hover {
    background-color: #dd0d58;
    border-radius: 0.5rem;
    transition: 0.2s;
  }
`;

export default Search;
