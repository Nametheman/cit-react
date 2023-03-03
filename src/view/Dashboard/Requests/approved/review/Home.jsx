import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wrapper, PageContainer } from "../../../Customers/Home";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import camera from "../../../../../assets/icons/camera.svg";
import {
  ClientInfoWrapper,
  ClientImageContainer,
  ClientName,
} from "../../pending/review/Home";
import dp from "../../../../../assets/images/dp_fallback.svg";
import downloadCloud from "../../../../../assets/icons/download-cloud.svg";
import { BASE_URL } from "../../../../../config/config";
import { Link } from "react-router-dom";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const approvedCustomer = JSON.parse(
    sessionStorage.getItem("approvedCustomerId")
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getApprovedCustomer = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/1/account-request/${approvedCustomer}`,
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
      } catch (error) {
        console.log(error);
      }
    };
    getApprovedCustomer();
  }, [approvedCustomer]);

  console.log(data);
  return (
    <Wrapper>
      <PageContainer style={{ padding: "10px" }}>
        <Content>
          <Link to="/requests">
            <BsFillArrowLeftCircleFill />
          </Link>
          <DetaiLContent>
            <ClientInfoWrapper>
              <ClientImageContainer>
                <img src={data?.image} alt="" className="client-dp" />
                <span className="camera-icons">
                  <img src={camera} alt="" />
                </span>
              </ClientImageContainer>
              <ClientName>
                <h3>
                  {data?.first_name} {data?.last_name}
                </h3>
                <p style={{ textTransform: "none" }}>{data?.email}</p>
                <p>{data?.phone_no}</p>
              </ClientName>
            </ClientInfoWrapper>
            <ClientImagesWrapper>
              <img src={data?.image} alt="" className="client-dp" />
              <img src={data?.image} alt="" className="client-dp" />
              <img src={data?.image} alt="" className="client-dp" />
            </ClientImagesWrapper>
          </DetaiLContent>

          <ClientContent>
            <div style={{ borderBottom: "1px solid #e0e0e0" }}>
              <Header>
                <h3>Account Information</h3>
                <div className="actionBtns">
                  <div className="downloadBtn">
                    <img src={downloadCloud} alt="" />
                    <p>Download</p>
                  </div>
                </div>
              </Header>
            </div>
            <ContentInfo>
              <div className="inputFields">
                <p>Full Name</p>
                <input
                  type="text"
                  value={`${data?.first_name} ${data?.last_name}`}
                  disabled
                />
              </div>
              <div className="inputFields">
                <p>Email Address</p>
                <input type="text" value={data?.email} disabled />
              </div>
              <div className="inputFields">
                <p>Address</p>
                <input type="text" value={data?.address} disabled />
              </div>
              <div className="inputFields">
                <p>BVN</p>
                <input type="text" value={data?.bvn} disabled />
              </div>
              <div className="inputFields">
                <p>Gender</p>
                <input type="text" value={data?.gender} disabled />
              </div>
              <div className="inputFields">
                <p>NIN</p>
                <input type="text" value={data?.nin} disabled />
              </div>
              <div className="inputFields">
                <p>Phone Number</p>
                <input type="text" value={data?.phone_no} disabled />
              </div>
              <div className="inputFields">
                <p>Date Of Birth</p>
                <input type="text" value={data?.dob} disabled />
              </div>
              <div className="inputFields">
                <p>Request Status</p>
                <input type="text" value={data?.status} disabled />
              </div>
              <div className="inputFields">
                <p>Date Joined</p>
                <input type="text" value={data?.updated_on} disabled />
              </div>
            </ContentInfo>
          </ClientContent>
        </Content>
      </PageContainer>
    </Wrapper>
  );
};

export default Home;

export const Content = styled.div`
  svg {
    font-size: 20px;
  }
  a {
    text-decoration: none;
    color: unset;
  }
`;
export const DetaiLContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const ClientImagesWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  img {
    heigth: 150px;
    width: 130px;
  }
`;
export const ClientContent = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  margin-top: 20px;
`;

export const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .actionBtns {
    display: flex;
    gap: 20px;

    .addAdminBtn {
      background: transparent;
      border: 1px solid #0e814a;
      border-radius: 4px;
      color: #0e814a;
      display: flex;
      justify-content: space-around;
      gap: 15px;
      padding: 7px 25px;
      cursor: pointer;

      p {
        font-size: 14px;
        margin-top: 3px !important;
      }
      img {
        width: 15px;
      }
    }
    .removeAdminBtn {
      background: transparent;
      border: 1px solid tomato;
      border-radius: 4px;
      color: tomato;
      display: flex;
      justify-content: space-around;
      gap: 15px;
      padding: 7px 25px;
      cursor: pointer;

      p {
        font-size: 14px;
        margin-top: 3px !important;
      }
      img {
        width: 15px;
      }
    }
    .downloadBtn {
      background: #0e814a;
      color: #fff;
      display: flex;
      justify-content: space-around;
      gap: 15px;
      padding: 7px 25px;
      border-radius: 4px;
      cursor: pointer;

      p {
        font-size: 14px;
        margin-top: 3px !important;
      }
    }
  }
`;
export const ContentInfo = styled.div`
  padding: 15px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .inputFields {
    margin-bottom: 20px;
    p {
      font-size: 13px;
      font-weight: 500;
    }
    input {
      margin-top: 5px;
      width: 400px;
      padding: 0 10px;
      height: 30px;
    }
  }
`;
