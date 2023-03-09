import React, { Fragment, useRef } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Content from "./Content";
import citLogo from "../../assets/images/logo.png";
import modalApproved from "../../assets/images/modal-approved-icon.svg";
import Modals from "./Modals";

const index = ({ children }) => {
  return (
    <Fragment>
      <Container id="container">
        <Modals />
        <Sidebar />
          <Content>{children}</Content>
      </Container>
    </Fragment>
  );
};

export default index;

const Container = styled.div`
  position: relative;
`;
