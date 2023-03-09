import React, { useState, useEffect } from "react";
import { FilterContainer } from "../../Customers/Home";
import { TableWrapper } from "../../Customers/Home";
import { PaginationWrapper } from "../../Customers/Home";
import { PaginationBtnWrapper } from "../../Customers/Home";
import downloadCloud from "../../../../assets/icons/download-cloud.svg";
import ReusableTable from "../../../../reusables/table/ReusableTable";
import { tableData } from "../../Overview/Graphicals/tableData";
import { BASE_URL } from "../../../../config/config";
import Skeleton from "react-loading-skeleton";

const Declined = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [init, setInit] = useState(1);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const [endNumber, setEndNumber] = useState(indexOfLastPost)
  const [startCount, setStartCount] = useState(currentPage);
  const [endCount, setEndCount] = useState(currentPage * 10);
  const [searchParams, setSearchParams] = useState("");
  let num = 1;

  const dataLength = data?.count;
  const endPage = Math.ceil(dataLength / postsPerPage);
  let myData = data?.results;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const myPageNumbers = pageNumbers.slice(startPoint, endPoint);

  const columns = [
    { field: "no", header: "No" },
    { field: "name", header: "Full Name" },
    { field: "number", header: "  Email Address" },
    { field: "date", header: "Date Of Birth" },
    { field: "gender", header: "Gender" },
    { field: "email", header: "Rejection Reason" },
  ];

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

  useEffect(() => {
    const getPendingRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/1/account-request/?status=declined&page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = await response.json();
        if (data?.count === 0) {
          setStartCount(0);
          setEndCount(0);
        }
        setData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getPendingRequests();
  }, [currentPage]);

  useEffect(() => {
    if (myData?.length < postsPerPage) {
      setEndCount(endCount + (myData?.length - 10));
    }

    if (endPage > currentPage) {
      setEndCount(currentPage * 10);
    }

    // setStartCount(endCount- (myData.length - 1))
  }, [currentPage, loading]);

  console.log(data);

  const csvExportHandler = () => {
    const csvTableHead = [
      "Full Name",
      "Email Address",
      "Date Of Birth",
      "Gender",
      "Rejection Reason",
    ];

    const myCsvData = JSON.parse(JSON.stringify(myData));
    let formattedData = [];
    for (let i = 0; i < myCsvData.length; i++) {
      // let customer = { ...myCsvData[i].customer };

      let firstNamwe = myCsvData[i].first_name;
      let lastName = myCsvData[i].last_name;
      let email = myCsvData[i].email;
      let dob = myCsvData[i].dob;
      let gender = myCsvData[i].gender;
      let rejectionReason = myCsvData[i].rejection_reason;

      // const newBenName = benName.replace(/,/g, "");

      // let { last_name, first_name, customer_id } = customer;
      const csvData = {
        senderName: `${firstNamwe} ${lastName}`,
        email,
        dob,
        gender,
        rejectionReason,
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
    a.download = "declined-accounts.csv";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(blob);
  };

  return (
    <>
      <FilterContainer style={{ top: "140px" }}>
        {data?.count === 0 ? (
          ""
        ) : (
          <div className="buttonWrapper">
            <img src={downloadCloud} alt="download" />
            <button onClick={csvExportHandler}>Export Report</button>
          </div>
        )}
      </FilterContainer>

      {loading ? (
        <Skeleton height={"400px"} />
      ) : (
        <TableWrapper>
          <ReusableTable
            init={init}
            type="declinedCustomers"
            columns={columns}
            data={myData}
          />
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
        </TableWrapper>
      )}
    </>
  );
};

export default Declined;
