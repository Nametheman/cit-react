import React from "react";
import moment from "moment";
import classes from "./Table.module.css";
import nodata from "../../assets/images/no-data.gif";
import { Link } from "react-router-dom";
import { modalActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";

const ReusableTable = ({ data, columns, type, icon, init }) => {
  const dispatch = useDispatch();

  return (
    <>
      {type === "recent" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem", 
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.first_name} {datum?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.email}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.phone_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.dob}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                          className={classes.recentReview}
                        >
                          {datum?.gender} <button>Review</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {type === "customers" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.customer_detail?.first_name}{" "}
                        {datum?.customer_detail?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.customer_detail.email}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.customer_detail.phone_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.customer_detail.dob}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                          className={classes.recentReview}
                        >
                          {datum?.customer_detail.gender}{" "}
                          <Link
                            to="/customer-review"
                            onClick={() => {
                              // alert(datum?.customer_detail?.customer_id)
                              sessionStorage.setItem(
                                "customerId",
                                JSON.stringify(datum?.id)
                              );
                            }}
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {type === "approvedCustomers" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.first_name} {datum?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.email}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.phone_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.dob}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                          className={classes.recentReview}
                        >
                          {datum?.gender}{" "}
                          <Link
                            to="/approved-review"
                            onClick={() => {
                              sessionStorage.setItem(
                                "approvedCustomerId",
                                JSON.stringify(datum?.id)
                              );
                            }}
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {type === "declinedCustomers" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.first_name} {datum?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.email}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.phone_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.dob}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                          className={classes.recentReview}
                        >
                          {datum?.gender}{" "}
                          <button
                            onClick={() => {
                              sessionStorage.setItem(
                                "declinedCustomerId",
                                JSON.stringify(datum?.id)
                              );
                              dispatch(
                                modalActions.toggleShowRejectionReasonModal()
                              );
                            }}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {type === "pendingCustomers" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.first_name} {datum?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.email}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.phone_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.dob}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                          className={classes.recentReview}
                        >
                          {datum?.gender}{" "}
                          <Link
                            to="/pending-review"
                            onClick={() => {
                              // alert(datum?.customer_detail?.customer_id)
                              sessionStorage.setItem(
                                "pendingcustomerId",
                                JSON.stringify(datum?.id)
                              );
                            }}
                          >
                            Review
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {type === "cit" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.created_on}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.customer?.first_name}{" "}
                        {datum?.customer?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.customer?.customer_id}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.beneficiary_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.beneficiary_acct_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        #{datum?.amount.toLocaleString()}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.reference}
                      </td>

                      <td
                        style={{
                          color: `${
                            datum.status === "success"
                              ? "green"
                              : datum.status === "failed"
                              ? "red"
                              : datum.status === "pending"
                              ? "rgb(153, 150, 7)"
                              : ""
                          }`,
                          background: `${
                            datum.status === "success"
                              ? "rgba(25, 183, 41, 0.1"
                              : datum.status === "failed"
                              ? "#eaa2a274"
                              : datum.status === "pending"
                              ? "rgba(255, 173, 51, 0.1)"
                              : ""
                          }`,
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          padding: "0.3em 1em",
                          alignItems: "center",
                        }}
                      >{`${
                        datum.status === "success"
                          ? "Success"
                          : datum.status === "failed"
                          ? "Failed"
                          : datum.status === "pending"
                          ? "Pending"
                          : ""
                      }`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {type === "bills" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.created_on}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.beneficiary}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.network}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.amount.toLocaleString()}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.transaction_id}
                      </td>
                      <td
                        style={{
                          color: `${
                            datum.status === "SUCCESS" || "success"
                              ? "green"
                              : datum.status === "failed"
                              ? "red"
                              : datum.status === "pending"
                              ? "rgb(153, 150, 7)"
                              : ""
                          }`,
                          background: `${
                            datum.status === "SUCCESS" || "success"
                              ? "rgba(25, 183, 41, 0.1"
                              : datum.status === "failed"
                              ? "#eaa2a274"
                              : datum.status === "pending"
                              ? "rgba(255, 173, 51, 0.1)"
                              : ""
                          }`,
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          padding: "0.3em 1em",
                          alignItems: "center",
                        }}
                      >{`${
                        datum.status === "SUCCESS" || "success"
                          ? "Success"
                          : datum.status === "failed"
                          ? "Failed"
                          : datum.status === "pending"
                          ? "Pending"
                          : ""
                      }`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {type === "electricity" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />
            </div>
          ) : (
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>
                  {columns.map((column, index) => {
                    return (
                      <th key={index} className={classes.th}>
                        {column.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((datum, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "Left",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "12px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.created_on}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.disco_type}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.meter_number}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.amount.toLocaleString()}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "33px",
                          paddingLeft: "10px",
                        }}
                      >
                        {datum?.transaction_id}
                      </td>
                      <td
                        style={{
                          color: `${
                            datum.status === "SUCCESS" || "success"
                              ? "green"
                              : datum.status === "failed"
                              ? "red"
                              : datum.status === "pending"
                              ? "rgb(153, 150, 7)"
                              : ""
                          }`,
                          background: `${
                            datum.status === "SUCCESS" || "success"
                              ? "rgba(25, 183, 41, 0.1"
                              : datum.status === "failed"
                              ? "#eaa2a274"
                              : datum.status === "pending"
                              ? "rgba(255, 173, 51, 0.1)"
                              : ""
                          }`,
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          padding: "0.3em 1em",
                          alignItems: "center",
                        }}
                      >{`${
                        datum.status === "SUCCESS" || "success"
                          ? "Success"
                          : datum.status === "failed"
                          ? "Failed"
                          : datum.status === "pending"
                          ? "Pending"
                          : ""
                      }`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default ReusableTable;
