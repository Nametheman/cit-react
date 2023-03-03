import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { ReactComponent as Cancel } from "../../assets/icons/cancel.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import AuthBg from "../../assets/images/loginBg.png";
import { AuthLayout } from "../../layout";

const index = ({ content }) => {
  return (
    <Fragment>
      <Container id="container">
        <LeftFrame>
          <img src={AuthBg} alt="" />
        </LeftFrame>
        <RightFrame>{content}</RightFrame>
      </Container>
    </Fragment>
  );
};

export default index;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1.2fr 1fr;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  p.error-msg {
    text-align: left !important;
    margin: 0px;
    padding: 0;
    margin-top: 0.5em;
    font-size: ${rem("13px")};
    letter-spacing: ${rem("0.13px")};
    color: #ff5e5e;
    opacity: 1;
  }

  p.success {
    text-align: left !important;
    margin: 0px;
    padding: 0;
    margin-top: 0.5em;
    font-size: ${rem("13px")};
    font-weight: bold;
    letter-spacing: ${rem("0.13px")};
    color: green;
    opacity: 1;
  }
`;

const LeftFrame = styled.div`
  height: 100%;
  position: relative;

  img {
    position: absolute;
    height: 95% !important;
    width: 90% !important;
    // object-fit: cover;
    padding: 0 !important;
    margin: 0 important;
  }
`;

const RightFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .form-container {
    border-radius: 10px;
    position: absolute;
    right: 50px;
    background: #fff;
    min-height: 400px;
    width: 400px;
    box-shadow: 0 10px 20px 3px #13540314;
    transition: 0.2s all ease-in-out;

    .form-header {
      position: relative;
      font-weight: 600;
      color: #0e814a;
      margin: 20px;

      ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        height: 3px;
        width: 50px;
        background-color: #0e814a;
        border-radius: 25px;
      }
    }

    .notification {
      display: flex;
      justify-content: center;
      div {
        transition: 0.5s ease-in-out;
        border: 1px solid;
        text-align: center;
        width: 240px;
        padding: 10px;
        background: tomato;
        color: white;
        // display: none;
        animation: shake;
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

        h3 {
          font-size: 15px;
        }
        p {
          font-size: 13px;
          text-transform: capitalize;
        }
      }
    }

    @keyframes shake {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }

    .form form {
      padding: 2px 30px 10px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-top: 40px;

      .form-input {
        label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 50px;
        }

        .input-field {
          margin-top: 5px;
          display: flex;
          align-items: center;
          background-color: #eeeeee;
          padding: 10px;
          height: 25px;
          width: 90%;
          transition: 0.1s ease-in;

          input {
            margin-left: 10px;
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            outline: none;
          }

          // svg{
          //   cursor:pointer;
          // }
        }
      }

      .input-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          border-radius: 5px;
          align-items: center;
          justify-content: center;
          display: flex;
          background-color: #0e814a !important;
          text-decoration: none;
          height: 40px;
          width: 90%;
          color: white;
          border: none;
          outline: none;
          font-size: 17px;
          cursor: pointer;
          transition: 0.2s all ease-in;

          :hover {
            transform: translateY(-10%);
          }
        }
      }
    }
  }
`;

export const BackButton = styled(Back)`
  position: absolute;
  left: 4rem;
  top: 2rem;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
`;
