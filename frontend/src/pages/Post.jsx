import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

function Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState();

  const notifySuccess = () => {
    toast.success('Movie added successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const addMovie = async (e) => {
    setLoading(true);

    const movie = { title, genre, year };

    try {
      const response = await fetch("http://localhost:5000/addMovie", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });

      const data = await response.json();

      if (response.ok) {
        notifySuccess();
        navigate('/');
      } else {
        notifyError(data.message);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifyError('Something went wrong, please try again later');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    addMovie();
  };

  return (
    <Container>
      <h1>Add Movie</h1>
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" name="genre" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <input type="number" name="year" placeholder="Release Year" value={year} onChange={(e) => setYear(e.target.value)} />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Add Movie'}
          </button>
        </form>
      </div>
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
    background-color: #00337C;
    padding: 1rem;
    border-radius: 0.7rem;
    margin-top: 1.3rem;

    label {
      font-size: 1.2rem;
      color: white;
    }

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
      background-color: #E96479;
      border: none;
      color: white;
      border-radius: 0.3rem;
    }

    button:hover {
      background-color: #DD0D58;
      border-radius: 0.5rem;
      transition: 0.2s;
    }
  }
`;

export default Post;