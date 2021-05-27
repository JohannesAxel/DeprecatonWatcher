import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ReactApexChart from 'react-apexcharts'
import {fetchDeveloper} from "../../Server/RequestHandler"

import React, { useState, useEffect } from 'react';


function App(props) {

  let { id } = useParams();
  const [data, setData] = useState({})
  const [series, setSeries] = useState([
      {
        name: 'South',
        data: [[],[]]
      },
      {
        name: 'North',
        data: [[],[]]
      },
      {
        name: 'Central',
        data: [[],[]]
      }
    ])

    const [options, setOptions] = useState({
      chart: {
        type: 'area',
        height: 350,
        animations: {
          enabled: false
        },
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.8,
        type: 'pattern',
        pattern: {
          style: ['verticalLines', 'horizontalLines'],
          width: 5,
          height: 6
        },
      },
      markers: {
        size: 5,
        hover: {
          size: 9
        }
      },
      title: {
        text: 'Network Monitoring',
      },
      tooltip: {
        intersect: true,
        shared: false
      },
      theme: {
        palette: 'palette1'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Bytes Received'
        }
      }})


  useEffect(async () => {
    const response = await fetchDeveloper(id)
    setData(response.data)
    setSeries(response.data.requests)
  },[])

return (
  <>
    <div className="title-4 unmark-text">
      <h3>{data?.developerName}</h3>
      <ReactApexChart options={options} series={series} type="area" height={350} />

    </div>
</>
);

}

export default App;