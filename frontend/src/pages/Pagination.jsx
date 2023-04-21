import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Pagination() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [ikey, setIkey] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/getPage?page=${page}&size=${size}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setSize(size)
      })
      .catch((error) => console.log(error));
  }, [page, size]);

  const handlePrevClick = () => {
    if (page > 1) setPage(page - 1);
    setIkey(ikey-10)
  };

  const handleNextClick = () => {
    if (page < totalPages) setPage(page + 1);
    setIkey(ikey+10)
  };

  return (
    <Container>
      <h1>Movies</h1>
      <ul className="pagination-list">
      <div className="pagination-top">
            <p style={{fontWeight:"800"}}>Rank</p>
            <div className="title">
                <p style={{marginLeft:"0.8rem", fontWeight:"800"}} id="title">Title</p>
            </div>
            <p style={{fontWeight:"800"}} id="year">Release </p>
        </div>
        {movies.map((movie,key) => (
          <div className="pagination-data" key={movie._id}>
            <p id="rank">{key+ikey}</p>
            <div className="title">
                <p id="title">{movie.title}</p>
                <p id="genre">{movie.genre}</p>
            </div>
            <p id="year">{movie.year}</p>
          </div>
        ))}
      </ul>
      <div className="pagination-button">
        <button onClick={handlePrevClick} disabled={page === 1}>
            Prev
        </button>
        <span>{page} of {totalPages}</span>
        <button onClick={handleNextClick} disabled={page === totalPages}>
            Next
        </button>
      </div>

    </Container>
  );
}
const Container = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1rem;

    .title{
        width:35rem;
        display: flex;
        flex-direction: column;
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

    .pagination-button{
        display: flex;
        gap:1rem;
        align-items: center;
        button{
            background: none;
            border: none;
            font-size: 1.2rem;
            background-color: #E96479;
            color:white;
            border-radius: 0.3rem;
            padding:0rem 0.5rem;
        }
        button:hover{
            transition: 0.2s ease-out;
            border-radius: 0.8rem;
            background-color: #DD0D58;
        }
    }

    .pagination-list{
        list-style: none;
    }
`
export default Pagination;