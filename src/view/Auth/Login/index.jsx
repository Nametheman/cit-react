import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../../service/Api";
import { Link, useNavigate, useHistory } from "react-router-dom";
import { BASE_URL } from "../../../config/config";
// import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from "../../../layout";
import { BiUser, BiLockOpenAlt, BiShowAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Index = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  const history = useHistory();

  const token = sessionStorage.getItem("token");

  const [err, setErr] = useState("");
  const [type, setType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const build = 1000000;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const authenticateUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/account/login/`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          build: 1000000,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setData(data);
      setLoading(false);
      console.log(data);
      if (
        data?.detail === "Login successful" &&
        data?.data?.customer?.customer_detail?.staff === true &&
        data?.access_token
      ) {
        sessionStorage.setItem("tab", "dashboard");
        sessionStorage.setItem("token", JSON.stringify(data?.access_token));
        sessionStorage.setItem(
          "customerFirstName",
          JSON.stringify(data?.data?.customer?.customer_detail?.first_name)
        );
        sessionStorage.setItem(
          "customerLastName",
          JSON.stringify(data?.data?.customer?.customer_detail?.last_name)
        );
        history.push("/dashboard");
      } else {
        setErr(data?.detail);
        setTimeout(() => {
          setErr("");
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (token) {
    console.log(token);
    console.log("logged in");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    authenticateUser();
    setUserName("");
    setPassword("");
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  const inputNameHandler = (e) => {
    let enteredName = e.target.value;
    setUserName(e.target.value);
    console.log(e.target.value);
  };
  const inputPassHandler = (e) => {
    let enteredPass = e.target.value;
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  return (
    <AuthLayout
      content={
        <div className="form-container">
          <div className="form-header">
            <h3>CIT Admin Login</h3>
          </div>
          {err.length === 0 ? (
            ""
          ) : (
            <div className="notification">
              <div>
                <h3>Uh Uh!</h3>
                <p>{err}</p>
              </div>
            </div>
          )}
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <label>Username</label>
                <div className="input-field">
                  <BiUser style={{ opacity: "0.6" }} />
                  <input
                    onChange={inputNameHandler}
                    type="text"
                    value={username}
                  />
                </div>
              </div>
              <div className="form-input">
                <label>Password</label>
                <div className="input-field">
                  <BiLockOpenAlt style={{ opacity: "0.6" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={inputPassHandler}
                    value={password}
                  />
                  <div style={{ cursor: "pointer" }} onClick={passwordHandler}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <BiShowAlt />}
                  </div>
                </div>
              </div>

              <div className="input-btn">
                <input
                  type="submit"
                  value={loading ? "Please wait..." : "Login"}
                />
              </div>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default Index;
