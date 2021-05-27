import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ReactApexChart from 'react-apexcharts'
import {fetchEndpoint} from "../../Server/RequestHandler"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeprecatedEndpoint from '../DeprecatedEndpoint/DeprecatedEnpoint'
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
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min))
          }
        },
      },
      colors: ['#008FFB', '#00E396', '#CED4DC'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
    })


  useEffect(async () => {
    const response = await fetchEndpoint(id)
    setData(response.data)
    setSeries(response.data.requests)
  },[])

return (
  <>
    <div className="title-4 unmark-text">
      <h3>{data?.endpointName}</h3>
    </div>
  <DeprecatedEndpoint/>
  <ReactApexChart options={options} series={series} type="area" height={350} />
</>
);

}

export default App;