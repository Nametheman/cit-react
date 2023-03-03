import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

export default function Bar({ data }) {
  const series = [
    {
      name: "CIT",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Others",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
      //   events: {
      //     click: function(chart, w, e) {
      //       // console.log(chart, w, e)
      //     }
      //   },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: "3",
    },
    colors: ["#0e814a", "#ECE9F1", "#B1E3FF", "#95A4FC", "#A1E3CB"],
    plotOptions: {
      bar: {
        columnWidth: "25%",
        distributed: true,
        borderRadiusTopLeft: 5,
        borderRadiusTopRight: 5,
      },
    },

    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div>
      {" "}
      <Chart options={options} series={series} width={690} height={300} />
    </div>
  );
}
