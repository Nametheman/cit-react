import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

const Search = ({ changeFunction }) => {
  return (
    <SearchWrapper>
      <BiSearch />
      <input
        type="text"
        placeholder="Search by name, customerID, account number, transaction reference"
        onChange={changeFunction}
      />
      <p>Search</p>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #0e814a;
  width: 480px;
  height: 35px;
  border-radius: 10px;
  overflow: hidden;

  svg {
    font-size: 18px;
    color: grey;
    margin: 0 10px;
  }

  input {
    width: 100%;
    color: #3d3d3d;
    height: 100%;
    border: none;
    outline: none;

    &::placeholder {
      font-size: 10px;
    }
  }

  p {
    font-size: 11px;
    color: #fff;
    padding: 10px 30px;
    background: #0e814a;
  }
`;
