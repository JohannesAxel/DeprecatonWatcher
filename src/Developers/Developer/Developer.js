import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ReactApexChart from 'react-apexcharts'
import {fetchDeveloper} from "../../Server/RequestHandler"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import React, { useState, useEffect } from 'react';


function Developer(props) {

  let { id } = useParams();

  //ResponseData
  const [data, setData] = useState({})

  //ApexCharts Data
  const [series, setSeries] = useState([])

    //ApexCharts settings
    const [options, setOptions] = useState({
      chart: {
        type: 'line',
        height: 350,
        animations: {
          enabled: false
        },
        zoom: {
          enabled: true
        },
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: [5,5,4],
        curve: 'straight'
      },
      markers: {
        size: 5,
        hover: {
          size: 9
        }
      },
      title: {
        text: 'Request Monitoring',
      },
      tooltip: {
        shared: true
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Requests Sent'
        }
      }})


  useEffect(async () => {

    //GET data
    const response = await fetchDeveloper(id)
    setData(response.data)
    setSeries(response.data.requests)
  },[])

return (
  <Grid container direction="column" spacing={8}>
    <Grid item>
      <div className="title-4 unmark-text">
        <h3>{data?.developerName}</h3>
      </div>
    </Grid>
    <Grid item>
      <Paper>
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </Paper>
    </Grid>
</Grid>
);

}

export default Developer;