import React, { useState, useEffect } from "react";
import ReusableTable from "../../../../reusables/table/ReusableTable";
import { Link } from "react-router-dom";
import { tableData } from "./tableData";
import styled from "styled-components";
import SearchInput from "../../../../reusables/inputs/SearchInput";

const Table = ({ dataSet }) => {
  const columns = [
    { field: "no", header: "No" },
    { field: "name", header: "Full Name" },
    { field: "email", header: "Email Address" },
    { field: "number", header: "Phone Number" },
    { field: "date", header: "Date Of Birth" },
    { field: "gender", header: "Gender" },
  ];
  const [init, setInit] = useState(1);

  const myData = tableData.slice(0, 10);
  return (
    <TableWrapper>
      <div className="recentHead">
        <h4>Recent Customers</h4>
        <SearchInput
          placeholder="Search by name, email, username...."
          myWidth="200px"
        />
      </div>
      <ReusableTable
        type="recent"
        init={init}
        columns={columns}
        data={dataSet}
      />
      <Link to="/requests">View All</Link>
    </TableWrapper>
  );
};

export default Table;

const TableWrapper = styled.div`
  width: 660px;
  padding: 20px 20px 80px;
  margin-top: 50px;
  background: #fff;
  border-radius: 30px;
  position: relative;

  @media only screen and (min-width: 1400px) {
    width: 52.3rem;
  }

  .recentHead {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      margin: 0 !important;
    }
  }

  a {
    right: 20px;
    position: absolute;
    margin-top: 20px;
    text-decoration: none;
    font-size: 13px;
    color: #0e814a;
    border: 1px solid;
    padding: 5px 10px;
  }
`;
