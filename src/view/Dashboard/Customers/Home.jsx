import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Search from "../../../reusables/table-search/Search";
import downloadCloud from "../../../assets/icons/download-cloud.svg";
import ReusableTable from "../../../reusables/table/ReusableTable";
import { tableData } from "../Overview/Graphicals/tableData";
import classes from "./Pagination.module.css";
import Pagination from "../../../reusables/pagination/Pagination";
import { BASE_URL } from "../../../config/config";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TableSkeletons from "../Overview/Skeletons/TableSkeletons";

const Home = () => {
  let num = 1;
  let myData;
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const columns = [
    { field: "no", header: "No" },
    { field: "name", header: "Full Name" },
    { field: "email", header: "Email Address" },
    { field: "number", header: "Phone Number" },
    { field: "date", header: "Date Of Birth" },
    { field: "gender", header: "Gender" },
  ];

  const [postsPerPage, setPostsPerPage] = useState(10);
  const [init, setInit] = useState(1);
  let currPage;

  console.log(init);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [endNumber, setEndNumber] = useState(indexOfLastPost);

  const dataLength = data?.count;
  myData = data?.results;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(5);

  const [startCount, setStartCount] = useState(currentPage);
  const [endCount, setEndCount] = useState(currentPage * 10);
  const [searchParams, setSearchParams] = useState("");

  const endPage = Math.ceil(dataLength / postsPerPage);

  const prevPageHandler = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage <= startPoint + 1) {
      setStartPoint(startPoint - 5);
      setEndPoint(endPoint - 5);
    }
    setStartCount(startCount - 10);
    setEndCount(endCount - 10);
    setInit(init - 10);
  };
  const nextPageHandler = () => {
    if (currentPage >= endPage) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage >= endPoint) {
      setStartPoint(startPoint + 5);
      setEndPoint(endPoint + 5);
    }
    setStartCount(startCount + 10);
    setEndCount(endCount + myData?.length);
    setInit(init + 10);
    num = num + 1;
  };

  const myPageNumbers = pageNumbers.slice(startPoint, endPoint);

  currPage = currentPage;

  const searchChangeHandler = (e) => {
    setLoading(true);
    setSearchParams(e.target.value.trim(""));
    setLoading(false);
  };

  useEffect(() => {
    if (myData?.length < postsPerPage) {
      setEndCount(endCount + (myData?.length - 10));
    }

    if (endPage > currentPage) {
      setEndCount(currentPage * 10);
    }
  }, [currentPage]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/1/customer?search=${searchParams}&page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = await response.json();
        setData(data);
        setLoading(false);
      } catch (e) {
        // console.log(e)
      }
    };

    getCustomers();
  }, [currentPage, searchParams]);

  console.log(data);
  console.log(loading);

  const csvExportHandler = () => {
    const csvTableHead = [
      "Full Name",
      "Email Address",
      "Phone Number",
      "Date Of Birth",
      "Gender",
    ];

    const myCsvData = JSON.parse(JSON.stringify(myData));
    let formattedData = [];
    for (let i = 0; i < myCsvData.length; i++) {
      let customer = { ...myCsvData[i].customer_detail };

      // let firstNamwe = myCsvData[i].first_name;
      // let lastName = myCsvData[i].last_name;
      // let email = myCsvData[i].email;
      // let dob = myCsvData[i].dob;
      // let gender = myCsvData[i].gender;
      // let rejectionReason = myCsvData[i].rejection_reason;

      // const newBenName = benName.replace(/,/g, "");

      let { last_name, first_name, email, phone_no, dob, gender } = customer;
      const csvData = {
        senderName: `${first_name} ${last_name}`,
        email,
        phone_no,
        dob,
        gender,
      };
      console.log(csvData);
      formattedData.push(csvData);
    }

    console.log(formattedData);
    const objValues = formattedData.map((item) =>
      Object.values(item).toString()
    );
    const csv = [csvTableHead, ...Object.values(objValues)].join("\n");
    console.log(csv);
    const blob = new Blob([csv], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    console.log(a);
    a.download = "Customers.csv";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(blob);
  };

  return (
    <Wrapper>
      <SkeletonTheme baseColor="#8b8a8a" highlightColor="#d2d0d0">
        <PageContainer>
          <div className="table-container">
            <div
              className="table-head"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3>Customers</h3>
              <Search changeFunction={searchChangeHandler} />
            </div>
          </div>

          <FilterContainer>
            <div className="buttonWrapper">
              <img src={downloadCloud} alt="download" />
              <button onClick={csvExportHandler}>Export Report</button>
            </div>
          </FilterContainer>
          <TableWrapper>
            {loading ? (
              <Skeleton width={"100%"} height={"400px"} />
            ) : (
              <ReusableTable
                init={init}
                type="customers"
                data={myData}
                columns={columns}
              />
            )}
            {loading ? (
              ""
            ) : (
              <PaginationWrapper>
                <h5>
                  Showing {startCount} to {endCount} of {dataLength} Entries
                </h5>
                <PaginationBtnWrapper>
                  <button onClick={prevPageHandler}>Previous</button>
                  {myPageNumbers.map((number) => (
                    <div key={number} className="numbers">
                      <p
                        href="#"
                        style={{
                          background: currentPage === number ? "#868d024a" : "",
                        }}
                        key={number}
                      >
                        {number}
                      </p>
                    </div>
                  ))}
                  <button onClick={nextPageHandler}>Next</button>
                </PaginationBtnWrapper>
              </PaginationWrapper>
            )}
            {/* {currentPage} */}
          </TableWrapper>
        </PageContainer>
      </SkeletonTheme>
    </Wrapper>
  );
};

export default Home;
export const Wrapper = styled.section`
  padding: 0.5rem 2rem;
`;
export const PageContainer = styled.div`
  // margin-left: 30px;
  // height: 200vh;
  padding-bottom: 30px;
  border-radius: 10px;
  background: #fff;
  position: relative;

  .table-container {
    border-bottom: 0.7px solid #e0e0e0;
    .table-head {
      padding: 1rem 2rem;

      h3 {
        margin: 0 !important;
        font-size: 20px;
      }
    }
  }
`;

export const FilterContainer = styled.div`
  position: absolute;
  right: 30px;
  top: 90px;

  .buttonWrapper {
    background: #0e814a;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;

    img {
      height: 20px;
      width: 20px;
    }
    button {
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
  }
`;
export const TableWrapper = styled.div`
  margin-top: 80px;
  padding: 0 30px;
`;
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  h5 {
    font-weight: 500;
  }
`;
export const PaginationBtnWrapper = styled.div`
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;

  button:not(.numbers a) {
    text-decoration: none;
    color: black;
    margin: 0 10px;
    font-size: 11px;
    font-weight: 600;
    font-family: "Karla", sans-serif;
    border: none;
    background: none;
    cursor: pointer;
    height: 100%;
  }

  .numbers {
    margin-bottom: 0px;

    p {
      cursor: default;
      color: black;
      text-decoration: none;
      border: 0.5px solid #d2d2d2;
      padding: 8px 12px;
      font-family: "Karla", sans-serif;
      font-size: 11px;
      font-weight: 600;
    }
  }
`;
