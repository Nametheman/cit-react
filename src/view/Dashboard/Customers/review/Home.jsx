import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wrapper, PageContainer } from "../Home";
import {
  Content,
  DetaiLContent,
  ClientContent,
  Header,
  ContentInfo,
} from "../../Requests/approved/review/Home";
import {
  ClientInfoWrapper,
  ClientImageContainer,
  ClientName,
} from "../../Requests/pending/review/Home";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import camera from "../../../../assets/icons/camera.svg";
import dp from "../../../../assets/images/dp_fallback.svg";
import downloadCloud from "../../../../assets/icons/download-cloud.svg";
import addIcon from "../../../../assets/icons/add-icon.svg";
import { BASE_URL } from "../../../../config/config";
import { AiOutlineStop, AiFillLock, AiFillUnlock } from "react-icons/ai";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const customerId = JSON.parse(sessionStorage.getItem("customerId"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [limit, setLimit] = useState();
  const [newLimit, setNewLimit] = useState();
  const [dailyLimit, setDailyLimit] = useState("");
  const [currentlyAdmin, setCurrentlyAdmin] = useState(false);
  const [currentlyLocked, setCurrentlyLocked] = useState(false);
  const [examplePayload, setExamplePayload] = useState({});
  let payload = {};
  const dependency = 1;
  // let is_active;
  useEffect(() => {
    const getCusomerInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/1/customer/${customerId}`,
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
        setLimit(data?.transfer_limit);
        setDailyLimit(data?.daily_limit);
        if (data?.customer_detail?.staff === false) {
          setCurrentlyAdmin(false);
        } else if (data?.customer_detail?.staff === true) {
          setCurrentlyAdmin(true);
        }

        if (data?.active === true) {
          setCurrentlyLocked(false);
        } else if (data?.active === false) {
          setCurrentlyLocked(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCusomerInfo();
  }, [dependency]);

  // console.log(data);

  const addAdminHandler = () => {
    setCurrentlyAdmin(true);
    // setExamplePayload((examplePayload) => ({}));
    console.log(payload);
    payload.staff_status = true;
  };

  const removeFromAdminHnalder = () => {
    setCurrentlyAdmin(false);
    console.log(payload);
    payload.staff_status = false;
  };

  const lockAccountHandler = () => {
    setCurrentlyLocked(true);
    console.log(payload);
  };

  const unlockAccountHandler = () => {
    setCurrentlyLocked(false);
    // payload.is_active = true;
    payload.is_active = currentlyLocked;
    console.log(payload);
  };

  const trsfLimitHandler = (e) => {
    setLimit(e.target.value);
  };
  const dailyLimitHandler = (e) => {
    setDailyLimit(e.target.value);
  };

  const updateAccountDetails = async () => {
    try {
      setPostLoading(true);
      const response = await fetch(`${BASE_URL}/api/1/customer/${customerId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setPostLoading(false);
      if (response.status === 200) {
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fireChangesHandler = () => {
    console.log(payload);
    updateAccountDetails();
  };

  // console.log(limit, dailyLimit);
  payload.transfer_limit = Number(limit);
  payload.daily_limit = Number(dailyLimit);
  payload.staff_status = currentlyAdmin;
  return (
    <Wrapper>
      <PageContainer style={{ padding: "10px" }}>
        <Content>
          <Link to="/customers">
            <BsFillArrowLeftCircleFill />
          </Link>
          <DetaiLContent>
            <ClientInfoWrapper>
              <ClientImageContainer>
                <img style={{ width: "130px" }} src={data?.image} alt="" />
                <span className="camera-icons">
                  <img src={camera} alt="" />
                </span>
              </ClientImageContainer>
              <ClientName>
                <h3>
                  {data?.customer_detail?.first_name}{" "}
                  {data?.customer_detail?.last_name}
                </h3>
                <p style={{ textTransform: "none" }}>
                  {data?.customer_detail?.email}
                </p>
                <p>{data?.customer_detail?.phone_no}</p>
              </ClientName>
            </ClientInfoWrapper>
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

                  {!currentlyAdmin ? (
                    <div className="addAdminBtn" onClick={addAdminHandler}>
                      <img src={addIcon} alt="" />
                      <p>Add User as Admin</p>
                    </div>
                  ) : (
                    <div
                      className="removeAdminBtn"
                      onClick={removeFromAdminHnalder}
                    >
                      <AiOutlineStop />
                      <p>Remove from Admin</p>
                    </div>
                  )}
                </div>
              </Header>
            </div>
            <OuterContent>
              <ContentInfo>
                <div className="inputFields">
                  <p>Username</p>
                  <input
                    type="text"
                    value={`${data?.customer_detail?.username}`}
                    disabled
                  />
                </div>
                <div className="inputFields">
                  <p>Customer ID</p>
                  <input
                    type="text"
                    value={data?.customer_detail?.customer_id}
                    disabled
                  />
                </div>
                <div className="inputFields">
                  <p>Date Of Birth</p>
                  <input
                    type="text"
                    value={data?.customer_detail?.dob}
                    disabled
                  />
                </div>
                <div className="inputFields">
                  <p>BVN</p>
                  <input type="text" value={data?.bvn_number} disabled />
                </div>
                <div className="inputFields">
                  <p>Gender</p>
                  <input
                    type="text"
                    value={data?.customer_detail?.gender}
                    disabled
                  />
                </div>
                <div className="inputFields">
                  <p>Date Joined</p>
                  <input type="text" value={data?.created_on} disabled />
                </div>
                <div className="inputFields">
                  <p>Limit Per Transfer</p>
                  <input
                    type="text"
                    value={limit}
                    onFocus={() => {
                      setLimit("");
                    }}
                    onChange={trsfLimitHandler}
                  />
                </div>
                <div className="inputFields">
                  <p>Daily Transfer Limit</p>
                  <input
                    type="text"
                    value={dailyLimit}
                    onFocus={() => {
                      setDailyLimit("");
                    }}
                    onChange={dailyLimitHandler}
                  />
                </div>
                <div className="inputFields">
                  <p>Accounts</p>
                  <input
                    type="text"
                    value={data?.accounts[0].account_no}
                    disabled
                  />
                </div>
                <div className="inputFields">
                  <p>Lock Status</p>
                  <input
                    type="text"
                    value={data?.active === false ? "Locked" : "Unlocked"}
                    disabled
                  />
                </div>
              </ContentInfo>
              <LockUnlock>
                {!currentlyLocked ? (
                  <div className="lockUnlockBtn" onClick={lockAccountHandler}>
                    <AiFillLock />
                    <p>Lock Account</p>
                  </div>
                ) : (
                  <div className="lockUnlockBtn" onClick={unlockAccountHandler}>
                    <AiFillUnlock />
                    <p>Unlock Account</p>
                  </div>
                )}
              </LockUnlock>
              <SaveButtonWrapper>
                <button onClick={fireChangesHandler}>Save Changes</button>
              </SaveButtonWrapper>
            </OuterContent>
          </ClientContent>
        </Content>
      </PageContainer>
    </Wrapper>
  );
};

export default Home;

const OuterContent = styled.div``;
const LockUnlock = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: row-reverse;
  justify-content: space-between;

  .lockUnlockBtn {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ff0000b3;
    padding: 7px 6px;
    border-radius: 4px;
    cursor: pointer;

    svg {
      font-size: 14px;
      color: tomato;
    }
    p {
      font-size: 12px;
      color: tomato;
    }
  }
`;

const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;

  button {
    background: #0e814a;
    color: #fff;
    border: none;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 4px;
  }
`;
