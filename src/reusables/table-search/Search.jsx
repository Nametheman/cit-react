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
  border: 1px solid #0e814a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 35px;
  border-radius: 8px;
  padding-left: 10px;
  overflow: hidden;

  svg {
    font-size: 18px;
    color: grey;
    margin: 0 10px;
  }

  input {
    width: 75%;
    height: 90%;
    border: none;
    outline: none;

    &::placeholder {
      font-size: 10px;
    }
  }

  p {
    font-size: 13px;
    text-align: center;
    background: #0e814a;
    color: #fff;
    padding: 10px 20px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
  }
`;
