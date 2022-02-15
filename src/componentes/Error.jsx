import React from 'react'
import styled from "@emotion/styled";


const TextoError = styled.div`

    background: none;
    border: 1px solid red;
    color: red;
    padding: 15px;
    font-size: 12px;
    border-radius: 10px;
    text-transform: uppercase;
    font-family: 'lato', sans-serif;
    font-weight: 700;
    text-align: center;

`

const Error = ({children}) => {
  return (
    <TextoError>{children}</TextoError>
  )
}

export default Error