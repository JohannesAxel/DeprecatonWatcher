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
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';



function App(props) {

const today = new Date()
const tomorrow = new Date()

tomorrow.setDate(tomorrow.getDate() + 1)

const [values, setValues] = useState([today, tomorrow])

const [firstMail, setFirstMail] = useState()
const [reminderMail, setReminderMail] = useState()
const [lastWarningMail, setLastWarningMail] = useState()

const [firstMailReq, setFirstMailReq] = useState('')
const [reminderMailReq, setReminderMailReq] = useState('')
const [lastWarningMailReq, setLastWarningMailReq] = useState('')

function handleFirstMailDate(dates){
console.log(dates[0].format("YYYY MM dd"))
setValues(dates)
}

function handleFirstMailReq (event) {
  setFirstMailReq(event.target.value)
}
function handleReminderMailReq(event){
  setReminderMailReq(event.target.value)
}
function handleLastWarningMailReq(event){
  setLastWarningMailReq(event.target.value)
}
const handleChange = (event) => {
  console.log("hej")
};

return (
  <>
    <div className="title-4 unmark-text">
      <h3 style={{color:"#eda493"}}>Deprecated </h3>
    </div>

  <Grid container direction="row" justify="left" alignItems="center" spacing={3}>
      <Grid container item xs={5}>
        <TextField id="standard-multiline-flexible" label="First Mail"variant="outlined" fullWidth={true} rows={10}  multiline />
      </Grid>
      <Grid item xs={2}>
      <InputLabel id="firstMailReq">Send to</InputLabel>
      <Select
          
          labelId="firstMailReq"
          id="firstMailReq"
          value={firstMailReq}
          onChange={handleFirstMailReq}
        >
          <MenuItem value={"Everyone"}>Everyone</MenuItem>
          <MenuItem value={"Have Used"}>Have Used</MenuItem>
          <MenuItem value={"Using"}>Using</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={5}>
        <Calendar multiple bvalue={values} onChange={handleFirstMailDate}plugins={[<DatePanel/>]}/>
      </Grid>
      <Grid container item xs={5}>
        <TextField id="standard-multiline-flexible" label="Reminder Mail"variant="outlined" fullWidth={true} rows={10} multiline />
      </Grid>
      <Grid item xs={2}>
      <InputLabel id="reminderMailReq">Send to</InputLabel>
      <Select
          labelId="reminderMailReq"
          id="reminderMailReq"
          value={reminderMailReq}
          onChange={handleReminderMailReq}
        >
          <MenuItem value={"Everyone"}>Everyone</MenuItem>
          <MenuItem value={"Have Used"}>Have Used</MenuItem>
          <MenuItem value={"Using"}>Using</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={5}>
        <Calendar multiple bvalue={values} onChange={setValues}plugins={[<DatePanel/>]}/>
      </Grid>
      <Grid container item xs={5}>
        <TextField id="standard-multiline-flexible" label="Last Warning Mail" fullWidth={true} rowsMax={10}variant="outlined" rows={10} multiline />
      </Grid>
      <Grid item xs={2}>
      <InputLabel id="[lastWarningMailReq">Send to</InputLabel>
      <Select
          labelId="lastWarningMailReq"
          id="lastWarningMailReq"
          value={lastWarningMailReq}
          onChange={handleLastWarningMailReq}
        >
          <MenuItem value={"Everyone"}>Everyone</MenuItem>
          <MenuItem value={"Have Used"}>Have Used</MenuItem>
          <MenuItem value={"Using"}>Using</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={5}>
        <Calendar multiple bvalue={values} onChange={setValues}plugins={[<DatePanel/>]}/>
      </Grid>
  </Grid>
</>
);

}

export default App;