import React from "react"
import styled from "styled-components";
import Pagination from "./Pagination";

function Main(){
  return (
    <Container>
      <Pagination/>
    </Container>
  )
};
 const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center; `
export default Main;
