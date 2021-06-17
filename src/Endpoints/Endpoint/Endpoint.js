import {
  useParams
} from "react-router-dom";
import ReactApexChart from 'react-apexcharts'
import {fetchEndpoint, postDeprecations, deleteDeprecations} from "../../Server/RequestHandler"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeprecatedEndpoint from '../DeprecatedEndpoint/DeprecatedEnpoint'
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import {DialogContent,DialogContentText,DialogTitle} from '@material-ui/core'

function UndeprecateDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleYes = () => {
    setOpen(false);
    props.onUndeprecation()
  }
  const handleNo = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          <h4>
            Undeprecate
          </h4>
        </Button>
      <Dialog
        open={open}
        onClose={handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to undeprecate this endpoint?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All deprecation data will be removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Endpoint(props) {

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
          text: 'Requests Recived'
        }
      }})

  useEffect(async () => {
    const response = await fetchEndpoint(id)
    setData(response.data)
    setSeries(response.data.requests)
  },[])

  async function handleDeprecation(){
    postDeprecations(id)
    const response = await fetchEndpoint(id)
    setData(response.data)
  }
  async function handleUndeprecation(){
    deleteDeprecations(id)
    const response = await fetchEndpoint(id)
    setData(response.data)
  }

return (
  <Grid container direction="column" spacing={8}>
    <Grid item container direction="row" alignItems="center" justify="space-between">
      <Grid item>
      {data?.deprecationData ? 
        <div className="title-4 unmark-text">
          <h3 style={{textDecoration:"line-through"}}>{data?.endpointName}</h3>
        </div>
        :<div className="title-4 unmark-text">
          <h3>{data?.endpointName}</h3>
        </div>
        }
      </Grid>
      <Grid item>
        {data?.deprecationData ? 
        <UndeprecateDialog onUndeprecation={handleUndeprecation} variant="contained" color="primary">
      </UndeprecateDialog>
        :
        <Button onClick={handleDeprecation} variant="contained" color="primary">
          <h4>
            Deprecate
          </h4>
        </Button>
        }
        
      </Grid>
    </Grid>
    <Grid item container direction="row" alignItems="center" justify="space-between">
      {data?.deprecationData ? <DeprecatedEndpoint data={data.deprecationData}/>: ""}
    </Grid>
    <Grid item>
    <Paper item elevation={2}>
      <ReactApexChart options={options} series={series} type="area" height={350} />
      </Paper>
    </Grid>
</Grid>
);

}

export default Endpoint;