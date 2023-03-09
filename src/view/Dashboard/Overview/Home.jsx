import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import phonePic from "../../../assets/icons/cit2.svg";
import airtime from "../../../assets/icons/airtime-mobile.svg";
import electricity from "../../../assets/icons/electricity.svg";
import internet from "../../../assets/icons/internet-mobile.svg";
import cableTV from "../../../assets/icons/tv-mobile.svg";
import transactionsIcon from "../../../assets/images/transactions.svg";
import mobileUsersIcon from "../../../assets/images/mobile-users.svg";
import airtimeIcon from "../../../assets/images/airtime.svg";
import billsPayment from "../../../assets/images/bills-payment.svg";
import Bar from "./Graphicals/LineChart";
import Pie from "./Graphicals/PieChart";
import { Line } from "recharts";
import Table from "./Graphicals/Table";
import SearchInput from "../../../reusables/inputs/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/config";
import Skeleton from "react-loading-skeleton";
import { axiosDashboard } from "../../../service/Api";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const customerFirstName = JSON.parse(
    sessionStorage.getItem("customerFirstName")
  );
  const customerLastName = JSON.parse(
    sessionStorage.getItem("customerLastName")
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const bills = [
    { image: airtime, background: "#0D96F8", name: "Airtime" },
    { image: internet, background: "#7495E5", name: "Mobile Data" },
    { image: cableTV, background: "#916AFF", name: "Cable TV" },
    { image: electricity, background: "#FBB538", name: "Electricity" },
  ];

  const [id, setId] = useState(1);
  // const {data, isLoading, isError, status, } = useQuery({
  //   queryKey: ['id', id],
  //   queryFn: () => {
  //     axiosDashboard(id)
  //   },
  //   enabled: Boolean(id)
  // })

  // console.log(process.env.REACT_APP_BANK_ID)

  const abortController = new AbortController();
  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api?bank_id=1`, {
          method: "GET",
          signal: abortController.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        let data = await response.json();
        setData(data || data);
        setLoading(false);
      } catch (e) {
        if (!abortController.signal.aborted) {
          console.log(e);
        }
      }
    };

    getDashboard();

    return () => {
      abortController.abort();
    };
  }, []);

  console.log(process.env.REACT_APP_BASE_URL);
  console.log(data);

  const pieData = [
    data?.airtime_purchase_total,
    data?.data_purchase_total,
    data?.cable_tv_purchase_total,
    data?.electricity_purchase_total,
  ];
  return (
    <>
      <PageContainer>
        <BigWrapper>
          <SearchInput placeholder="Search anything..." />
          <BigCardWrapper>
            <div className="board">
              <div className="welcome-board">
                <div className="welcome-name">
                  <p>Welcome Back,</p>
                  <h2>
                    {customerFirstName} {customerLastName}
                  </h2>
                </div>

                <img src={phonePic} alt="" />
              </div>
              <div className="bill-pictures">
                {bills.map((bill) => {
                  return (
                    <div
                      className="bill-card"
                      style={{ background: `${bill.background}` }}
                    >
                      {" "}
                      <img src={bill.image} alt="" />{" "}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-wrapper">
              {loading ? (
                <Skeleton width={"13.6rem"} height={"100px"} />
              ) : (
                <div
                  className="card"
                  style={{ background: "rgba(87, 180, 247, 0.35)" }}
                >
                  <img src={mobileUsersIcon} alt="" />
                  <div className="trsf-details">
                    <p>Mobile App Users</p>
                    <div className="mobile-users-details">
                      <div className="active-detail">
                        <span className="active-blip"></span>
                        <p>Active: {0 || data?.total_active_customer_count}</p>
                      </div>
                      <div className="inactive-detail">
                        <span className="inactive-blip"></span>
                        <p>
                          Inactive: {0 || data?.total_inactive_customer_count}
                        </p>
                      </div>
                    </div>
                    <h6 style={{ color: "#0e814a" }}>
                      {0 || data?.total_customer_count}
                    </h6>
                  </div>
                </div>
              )}

              {loading ? (
                <Skeleton width={"13.6rem"} height={"100px"} />
              ) : (
                <div className="card" style={{ background: "#7496e581" }}>
                  <img src={transactionsIcon} alt="" />
                  <div className="trsf-details">
                    <p>Transactions</p>
                    <small>Count: {0 || data?.total_transaction_count}</small>
                    <h6 style={{ color: "#002c96" }}>
                      #{0 || data?.total_transaction_amount.toLocaleString()}
                    </h6>
                  </div>
                </div>
              )}

              {loading ? (
                <Skeleton width={"13.6rem"} height={"100px"} />
              ) : (
                <div className="card" style={{ background: "#ffe8be" }}>
                  <img src={airtimeIcon} alt="" />
                  <div className="trsf-details">
                    <p>Total Airtime</p>
                    <small style={{ color: "#c74e34" }}>
                      Count: {0 || data?.airtime_count}{" "}
                    </small>
                    <h6 style={{ color: "#9b6400" }}>
                      #{0 || data?.airtime_purchase_total.toLocaleString()}
                    </h6>
                  </div>
                </div>
              )}

              {loading ? (
                <Skeleton width={"13.6rem"} height={"100px"} />
              ) : (
                <div
                  className="card"
                  style={{ background: "rgba(135, 142, 2, 0.33)" }}
                >
                  <img src={billsPayment} alt="" />
                  <div className="trsf-details">
                    <p>Total Bill Payments</p>
                    <small>Count: {0 || data?.total_bill_payment_count} </small>
                    <h6 style={{ color: "#0e814a" }}>
                      #{0 || data?.total_bill_payment_amount.toLocaleString()}
                    </h6>
                  </div>
                </div>
              )}
            </div>
          </BigCardWrapper>
        </BigWrapper>

        <ChartWrapper>
          <LineChartWrapper>
            <h3>Recent Transactions</h3>
            <Bar />
          </LineChartWrapper>
          <TableWrapper>
            <Table dataSet={data?.recent_customer} />
          </TableWrapper>
          <PieChartWrapper>
            <Pie data={pieData} />
          </PieChartWrapper>
        </ChartWrapper>
      </PageContainer>
    </>
  );
};

export default Home;

export const PageContainer = styled.section`
  position: relative;
  padding: 1rem 2rem;
`;

const BigWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  background: #fbfbfb;
  padding-bottom: 5px;

  .search-box {
    display: flex;
    align-items: center;
    margin-left: 50%;
    background: #f8fdff;
    width: 27.5em;
    height: 30px;
    padding: 0 10px;
    border-radius: 10px;

    svg {
      color: grey;
    }

    input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      margin-left: 10px;
    }
  }
`;
const BigCardWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 30px;

  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 10px;

    .card {
      width: 13.6rem;
      // padding: 10px;
      height: 100px;
      border-radius: 15px;
      display: flex;
      align-items: flex-start;

      img {
        width: 60px;
      }
      .trsf-details {
        p {
          margin: 0 !important;
          margin-top: 10px !important;
          font-weight: 500;
          font-size: 14px;
        }
        small {
          font-size: 10px;
          font-weight: 500;
          margin: 0 !important;
          margin-top: 2px !important;
        }
        h6 {
          margin: 0 !important;
          margin-top: 10px !important;
          font-size: 14px;
        }

        .mobile-users-details {
          display: flex;
          gap: 8px;

          .active-detail {
            display: flex;
            align-items: center;
            gap: 4px;

            p {
              margin-top: 1px !important;
              font-size: 10px;
            }

            .active-blip {
              margin-top: 2px !important;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #0e814a;
            }
          }

          .inactive-detail {
            display: flex;
            align-items: center;
            gap: 4px;

            p {
              margin-top: 1px !important;
              font-size: 10px;
            }
            .inactive-blip {
              margin-top: 2px !important;
              width: 3.5px;
              height: 4px;
              border-radius: 50%;
              background: #ff0000b2;
            }
          }
        }
      }
    }
  }
  .board {
    .bill-pictures {
      margin-top: 35px;
      display: flex;
      width: 26rem;
      justify-content: space-around;
      @media only screen and (min-width: 1400px) {
        width: 36.4rem;
      }

      .bill-card {
        height: 60px;
        width: 60px;
        // border: 1px solid #000;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 20px;
        }
      }
    }

    .welcome-board {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-radius: 15px;
      background: rgb(125, 219, 166);
      background: linear-gradient(
        90deg,
        rgba(125, 219, 166, 1) 30%,
        rgba(235, 238, 172, 1) 100%
      );
      height: 6.3rem;
      width: 26rem;

      @media only screen and (min-width: 1400px) {
        width: 36.4rem;
      }

      img {
        width: 120px;
      }
      .welcome-name {
        color: #ffffff;

        h2 {
          font-size: 18px;
          margin-top: -15px;
        }
      }
    }
  }
`;

const ChartWrapper = styled.div`
  // position: absolute;
  // z-index: 5;
  position: relative;
  @media only screen and (min-width: 1400px) {
    width: 54.1rem;
  }
`;
const LineChartWrapper = styled.div`
  background: #fff;
  width: 703px;
  border-radius: 30px;
  margin-top: 270px;

  h3 {
    padding: 20px;
  }

  @media only screen and (min-width: 1400px) {
    width: 54.8rem;
  }
`;

const PieChartWrapper = styled.div`
  background: #fff;
  // margin-top: 20px;
  position: fixed;
  border-radius: 10px;
  top: 290px;
  right: 3.5rem;
  height: 300px;
  @media only screen and (min-width: 1400px) {
    right: 3.1rem;
  }
`;
const TableWrapper = styled.div``;
