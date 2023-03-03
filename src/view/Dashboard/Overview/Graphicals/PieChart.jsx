import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import styled from "styled-components";

export default function Pie({data}) {

  // console.log(data)

    const series = [20,40,30,47] || data  
    
    const  options = {
        chart: {
          height: '400px',
          type: 'donut',
          redrawOnParentResize: false, 


        //   events: {
        //     click: function(chart, w, e) {
        //       // console.log(chart, w, e)
        //     }
        //   },
          
        },
        colors:['#0d96f8', '#7495e5', '#916aff','#fbb538', '#A1E3CB'],
        plotOptions: {
                pie: {
                donut: {
                  size: "55%",
                },
                  startAngle: -90,
                  endAngle: 270,
                //   customScale: 2,
                  height: '300px',
                }
              },
        dataLabels: {
          enabled: false,
        },
        fill: {
            type: 'gradient',
        },
        legend: {
          show: 'false',
          fonSize: '8px',
          position: 'bottom',
          offsetY: 10,
          height: 60,
          fontFamily: 'Helvetica, Arial',
          fontWeight: 500,
          horizontalAlign: 'left', 


          markers: {
            width: 8,
            height: 8,
          }
        },
        labels: [
        "Airtime",
        "Data",
        "Cable TV",
        "Electricity",
      ],
        
    }
    
    return <div> <ReactApexChart options={options} type='donut' series={series} width={220} height={400}/></div>
}