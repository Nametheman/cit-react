import React, { useEffect, useState } from "react";
import Search from "../../../../reusables/table-search/Search";
import { Wrapper } from "../../Customers/Home";
import { PageContainer } from "../../Customers/Home";
import { FilterContainer } from "../../Customers/Home";
import { TableWrapper } from "../../Customers/Home";
import { PaginationWrapper } from "../../Customers/Home";
import { PaginationBtnWrapper } from "../../Customers/Home";
import downloadCloud from "../../../../assets/icons/download-cloud.svg";
import ReusableTable from "../../../../reusables/table/ReusableTable";
import { BASE_URL } from "../../../../config/config";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [init, setInit] = useState(1);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [endNumber, setEndNumber] = useState(indexOfLastPost);
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
    { field: "date", header: "Date" },
    { field: "senderName", header: "Sender Name" },
    { field: "senderId", header: "Sender ID" },
    { field: "beneficiary", header: "Beneficiary Name" },
    { field: "beneficiaryAcct", header: "Beneficiary Acct No" },
    { field: "amount", header: "Amount" },
    { field: "transRef", header: "Trans. Ref" },
    { field: "status", header: "Status" },
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

    // setStartCount(endCount- (myData.length - 1))
  }, [loading, currentPage]);

  useEffect(() => {}, [endCount]);

  useEffect(() => {
    const getApprovedRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/1/transfers/?search=${searchParams}&transfer_type=other&page=${currentPage}`,
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

    getApprovedRequests();
  }, [currentPage, searchParams]);
  console.log(data);

  const csvExportHandler = () => {
    const csvTableHead = [
      "Beneficiary Name",
      "Sender ID",
      "Date",
      "Sender Name",
      "Beneficiary Acct No",
      "Amount",
      "Trans. Ref",
      "Status",
    ];

    const myCsvData = JSON.parse(JSON.stringify(myData));
    let formattedData = [];
    for (let i = 0; i < myCsvData.length; i++) {
      let customer = { ...myCsvData[i].customer };
      let dates = myCsvData[i].created_on;
      let benName = myCsvData[i].beneficiary_name;
      let benAcount = myCsvData[i].beneficiary_acct_no;
      let reference = myCsvData[i].reference;
      let amount = myCsvData[i].amount;
      let status = myCsvData[i].status;

      const newBenName = benName.replace(/,/g, "");

      let { last_name, first_name, customer_id } = customer;
      const csvData = {
        senderName: `${last_name} ${first_name}`,
        customer_id,
        dates,
        newBenName,
        benAcount,
        amount,
        reference,
        status,
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
    a.download = "other-transfers.csv";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(blob);
  };

  return (
    <Wrapper>
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
            <h3>Other Bank Transfers</h3>
            <Search changeFunction={searchChangeHandler} />
          </div>
        </div>

        <FilterContainer>
          <div className="buttonWrapper">
            <img src={downloadCloud} alt="download" />
            <button onClick={csvExportHandler}>Export Report</button>
          </div>
        </FilterContainer>

        {loading ? (
          <Skeleton height={"400px"} />
        ) : (
          <TableWrapper>
            <ReusableTable
              init={init}
              type="cit"
              data={myData}
              columns={columns}
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
      </PageContainer>
    </Wrapper>
  );
};

export default Home;
