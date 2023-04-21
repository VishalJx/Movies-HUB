import React, { useState, useEffect } from "react";
import styled from "styled-components";

function GetAllMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getMovies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <h1>All Movies</h1>
      <div className="movies-container">
      <div className="pagination-top">
            <p style={{fontWeight:"800"}}>Rank</p>
            <div className="title">
                <p style={{marginLeft:"0.8rem", fontWeight:"800"}} id="title">Title</p>
            </div>
            <p style={{fontWeight:"800"}} id="year">Release </p>
        </div>
        {movies.map((movie, key) => (
          <div className="pagination-data" key={movie._id}>
          <p id="rank">{key}</p>
          <div className="title">
              <p id="title">{movie.title}</p>
              <p id="genre">{movie.genre}</p>
          </div>
          <p id="year">{movie.year}</p>
        </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title{
    width:30rem;
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-top: 1rem;
    font-size: 2rem;
    padding-bottom: 1rem;
  }
  .pagination-top{
    display: flex;
    gap:5rem;
    justify-content: space-between;
    padding:0.5rem;
    border-top: 0.13rem solid #9A9A9A;
    border-bottom: 0.13rem solid #9A9A9A;
}
.pagination-data{
    display: flex;
    align-items: start;
    gap:5rem;
    justify-content: space-between;
    padding:0.5rem;
    border-bottom: 0.1rem solid #D0D0D0;

    #rank{
        width:3rem;
    }
    p{
        font-size: 1.2rem;
        text-transform: capitalize;
    }
    #title{
        font-weight: 400;
    }
    #genre{
        color:grey;
        font-size: 1rem;
    }
}
.pagination-data:hover{
    background-color: #F0F0F0;
}
`;

export default GetAllMovies;