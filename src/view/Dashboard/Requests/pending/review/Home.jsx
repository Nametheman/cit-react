import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../../../Customers/Home";
import { modalActions } from "../../../../../store/ui-slice";
import { useDispatch } from "react-redux";
import dp from "../../../../../assets/images/dp_fallback.svg";
import camera from "../../../../../assets/icons/camera.svg";
import { BASE_URL } from "../../../../../config/config";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const customerId = JSON.parse(sessionStorage.getItem("pendingcustomerId"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getPendingCustomerInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/1/account-request/${customerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = await response.json();
        //   if( data?.count === 0){
        //     setStartCount(0)
        //     setEndCount(0)
        //    }
        setData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getPendingCustomerInfo();
  }, [customerId]);
  console.log(data);

  const approveRequestHandler = () => {
    dispatch(modalActions.toggleIsApproveModal());
  };

  const declineRequestHandler = () => {
    dispatch(modalActions.toggleIsDeclineModal());
  };

  // const customerDocDisplayHandler = () => {
  //   dispatch(modalActions.toggleClientDocModal());
  // };

  return (
    <Wrapper>
      {loading ? (
        <Skeleton
          width={"100%"}
          height={"700px"}
          style={{ marginTop: "20px" }}
        />
      ) : (
        <PageContainer>
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
          <ClientDetailsWrapper>
            <ClientDetails>
              <div>
                <p>Full Name</p>
                <input
                  type="text"
                  disabled
                  value={`${data?.first_name} ${data?.last_name}`}
                />
              </div>
              <div>
                <p>Email Address</p>
                <input type="text" disabled value={data?.email} />
              </div>
              <div>
                <p>Phone Number</p>
                <input type="text" disabled value={data?.phone_no} />
              </div>
              <div>
                <p>Gender</p>
                <input type="text" disabled value={data?.gender} />
              </div>
              <div>
                <p>BVN</p>
                <input type="text" disabled value={data?.bvn} />
              </div>
              <div>
                <p>Date Of Birth</p>
                <input type="text" disabled value={data?.dob} />
              </div>
              <div>
                <p>Residential Address</p>
                <input type="text" disabled value={data?.address} />
              </div>
            </ClientDetails>
            <ClientPictures>
              <img
                src={data?.image}
                alt=""
                onClick={() => {
                  dispatch(modalActions.toggleClientDocModal(data?.image));
                }}
              />
              <img
                src={data?.signature}
                alt=""
                onClick={() => {
                  dispatch(modalActions.toggleClientDocModal(data?.signature));
                }}
              />
              <img
                src={data?.utility}
                alt=""
                onClick={() => {
                  dispatch(modalActions.toggleClientDocModal(data?.utility));
                }}
              />
              <img
                src={data?.valid_id}
                alt=""
                onClick={() => {
                  dispatch(modalActions.toggleClientDocModal(data?.valid_id));
                }}
              />
            </ClientPictures>
          </ClientDetailsWrapper>
          <ActionButtonContainer>
            <button className="approve" onClick={approveRequestHandler}>
              Approve
            </button>
            <button className="decline" onClick={declineRequestHandler}>
              Decline
            </button>
          </ActionButtonContainer>
        </PageContainer>
      )}
    </Wrapper>
  );
};

export default Home;
export const PageContainer = styled.div`
  // margin-left: 30px;
  // height: 200vh;
  padding: 30px;
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
export const ClientInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const ClientImageContainer = styled.div`
  position: relative;
  .camera-icons {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #0e814a;
    display: flex;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
    }
  }

  .client-dp {
    width: 100px;
  }
`;

export const ClientName = styled.div`
  margin-bottom: 20px;
  text-transform: capitalize;
  h3 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 10px;
  }
`;

const ClientDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;
`;
const ClientDetails = styled.div`
  padding: 9px 50px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  // width: 50%;
  p {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 7px !important;
  }
  input {
    width: 320px;
    height: 35px;
    margin-bottom: 10px;
    padding: 0 10px;
  }
`;
const ClientPictures = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 0 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  img {
    height: 190px;
    width: 170px;
    /* border: 1px solid; */
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;
const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;

  button {
    padding: 10px 30px;
    border-radius: 3px;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  .approve {
    background: #0e814a;
  }
  .decline {
    background: #f9372a;
  }
`;
