import React from "react";
import styled from "styled-components";
import img from "../images/tv.png";
import { Link } from "react-router-dom";

function Navbar(){
  return (
    <Container>
        <div className="nav-logo" style={{color:"#BFACE2", display:"flex",alignItems:"center",gap:"0.5rem",fontWeight:"800"}}>
            <p style={{paddingTop:"0.6rem"}}><Link to="/" style={{color:"white", textDecoration:"none"}}> MoviesHUB</Link></p>
            <img src={img} alt="logo" />
        </div>
        <div className="nav-links">
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/search'><li>Search</li></Link>
                <Link to='/post'><li>Post</li></Link>
            </ul>
        </div>
    </Container>
  )
};

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2rem 1rem;
    background-color: #262A56;
    height: 4rem;

    .nav-logo {
        img {
            width: 2.5rem;
            color:white;
        }
    }
    .nav-links {
        ul {
            display: flex;
            gap:1.5rem;
            list-style: none;
            color:#fff;
            font-weight: 600;
            
            li{
                cursor: pointer;
                color:white;
                text-decoration: none;
            }
        }
    }
`

export default Navbar;
