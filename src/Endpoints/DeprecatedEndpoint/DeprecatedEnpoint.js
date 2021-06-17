import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ReactApexChart from 'react-apexcharts'
import {patchDeprecations} from "../../Server/RequestHandler"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { TrainRounded } from "@material-ui/icons";


function SaveButtons(props) {

  return (
    <Grid container direction="column" spacing={2}>
        {props.saved? <>
        <Grid item>
          <Button disabled variant="contained">
            Saved
          </Button>
        </Grid>
        <Grid item>
          <Button disabled variant="contained"> Cancel</Button>
        </Grid>
        </>
        :<>
        <Grid item>
          <Button onClick={props.onSave} variant="contained" color="primary">
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={props.onCancel} variant="contained" color="#edb393">Cancel</Button>
        </Grid>
        </>
      }
    </Grid>
  );
}


function DeprecatedEndpoint(props) {

const today = new Date()
const tomorrow = new Date()

tomorrow.setDate(tomorrow.getDate() + 1)

const [values, setValues] = useState([today, tomorrow])

const [firstMailDates, setFirstMailDates] = useState(props.data.firstMailDates)
const [reminderMailDates, setReminderMailDates] = useState(props.data.reminderMailDates)
const [lastWarningMailDates, setLastWarningMailDates] = useState(props.data.lastWarningMailDates)
const [firstMailSaved, setFirstMailSaved] = useState(true)
const [reminderMailSaved, setReminderMailSaved] = useState(true)
const [lastWarningMailSaved, setLastWarningMailSaved] = useState(true)
const [data, setData] = useState(props.data)

const [firstMail, setFirstMail] = useState(props.data.firstMail)
const [reminderMail, setReminderMail] = useState(props.data.reminderMail)
const [lastWarningMail, setLastWarningMail] = useState(props.data.lastWarningMail)

const [firstMailReq, setFirstMailReq] = useState(props.data.firstMailReq)
const [reminderMailReq, setReminderMailReq] = useState(props.data.reminderMailReq)
const [lastWarningMailReq, setLastWarningMailReq] = useState(props.data.lastWarningMailReq)


//State functions

function handleFirstMail (event) {
  setFirstMail(event.target.value)
  setFirstMailSaved(false)
}
function handleReminderMail(event) {
  setReminderMail(event.target.value)
  setReminderMailSaved(false)
}
function handleLastWarningMail(event) {
  setLastWarningMail(event.target.value)
  setLastWarningMailSaved(false)
}
function handleFirstMailReq (event) {
  setFirstMailReq(event.target.value)
  setFirstMailSaved(false)
}
function handleReminderMailReq(event) {
  setReminderMailReq(event.target.value)
  setReminderMailSaved(false)
}
function handleLastWarningMailReq(event) {
  setLastWarningMailReq(event.target.value)
  setLastWarningMailSaved(false)
}
function handleFirstMailDates(dates) {
  setFirstMailDates(dates)
  setFirstMailSaved(false)
}
function handleReminderMailDates(dates) {
  setReminderMailDates(dates)
  setReminderMailSaved(false)
}
function handleLastWarningMailDates(dates){
  setLastWarningMailDates(dates)
  setLastWarningMailSaved(false)
}
function saveFirstMail(event){
  patchDeprecations(data.deprecationId,"firstMail",firstMail)
  patchDeprecations(data.deprecationId,"firstMailDates",firstMailDates.map(date => date.format("YYYY MM DD")))
  patchDeprecations(data.deprecationId,"firstMailReq",firstMailReq)
  setFirstMailSaved(true)
}
function saveReminderMail(event){
  patchDeprecations(data.deprecationId,"reminderMail",reminderMail)
  patchDeprecations(data.deprecationId,"reminderMailDates",reminderMailDates.map(date => date.format("YYYY MM DD")))
  patchDeprecations(data.deprecationId,"reminderMailReq",reminderMailReq)
  setReminderMailSaved(true)
}
function saveLastWarningMail(event){
  patchDeprecations(data.deprecationId,"lastWarningMail",lastWarningMail)
  patchDeprecations(data.deprecationId,"lastWarningMailDates",lastWarningMailDates.map(date => date.format("YYYY MM DD")))
  patchDeprecations(data.deprecationId,"lastWarningMailReq",lastWarningMailReq)
  setLastWarningMailSaved(true)
}
function cancelFirstMail(event){
  setFirstMail(data.firstMail)
  setFirstMailDates(data.firstMailDates)
  setFirstMailReq(data.firstMailReq)
  setFirstMailSaved(true)
}
function cancelReminderMail(event){
  setReminderMail(data.reminderMail)
  setReminderMailDates(data.reminderMailDates)
  setReminderMailReq(data.reminderMailReq)
  setReminderMailSaved(true)
}
function cancelLastWarningMail(event){
  setLastWarningMail(data.lastWarningMail)
  setLastWarningMailDates(data.lastWarningMailDates)
  setLastWarningMailReq(data.lastWarningMailReq)
  setLastWarningMailSaved(true)
}
//State functions end

return (
  <Grid container direction="column" spacing={8}>
    <Grid item>
      <Paper item elevation={2}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3} style={{padding:"20px"}}>
          <Grid container item xs={4}>
            <TextField onChange={handleFirstMail} value={firstMail} id="standard-multiline-flexible" label="First Mail"variant="outlined" fullWidth={true} rows={10}  multiline />
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="firstMailReq">Send to</InputLabel>
            <Select labelId="firstMailReq"id="firstMailReq"value={firstMailReq}onChange={handleFirstMailReq}>
              <MenuItem value={"Everyone"}>Everyone</MenuItem>
              <MenuItem value={"Have Used"}>Have Used</MenuItem>
              <MenuItem value={"Using"}>Using</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Calendar multiple value={firstMailDates} onChange={handleFirstMailDates}plugins={[<DatePanel/>]}/>
          </Grid>
          <Grid item xs={2}>
          <SaveButtons onSave={saveFirstMail} onCancel={cancelFirstMail} saved={firstMailSaved}></SaveButtons>
            </Grid>
        </Grid>
      </Paper>
    </Grid>
    <Grid item>
      <Paper item elevation={2}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3} style={{padding:"20px"}}>
          <Grid container item xs={4}>
            <TextField onChange={handleReminderMail} value={reminderMail} id="standard-multiline-flexible" label="Reminder Mail"variant="outlined" fullWidth={true} rows={10} multiline />
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="reminderMailReq">Send to</InputLabel>
              <Select labelId="reminderMailReq" id="reminderMailReq" value={reminderMailReq} onChange={handleReminderMailReq}>
                <MenuItem value={"Everyone"}>Everyone</MenuItem>
                <MenuItem value={"Have Used"}>Have Used</MenuItem>
                <MenuItem value={"Using"}>Using</MenuItem>
              </Select>
            </Grid>
          <Grid item xs={4}>
            <Calendar multiple value={reminderMailDates} onChange={handleReminderMailDates}plugins={[<DatePanel/>]}/>
          </Grid>
          <Grid item xs={2}>
          <SaveButtons onSave={saveReminderMail} onCancel={cancelReminderMail} saved={reminderMailSaved}></SaveButtons>
            </Grid>
          </Grid>
      </Paper>
    </Grid>
    <Grid item>
    <Paper elevation={2}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={3} style={{padding:"20px"}}>
        <Grid container item xs={4}>
          <TextField onChange={handleLastWarningMail} value={lastWarningMail} id="standard-multiline-flexible" label="Last Warning Mail" fullWidth={true} rowsMax={10}variant="outlined" rows={10} multiline />
        </Grid>
        <Grid item xs={2}>
          <InputLabel id="lastWarningMailReq">Send to</InputLabel>
          <Select labelId="lastWarningMailReq" id="lastWarningMailReq" value={lastWarningMailReq} onChange={handleLastWarningMailReq}>
            <MenuItem value={"Everyone"}>Everyone</MenuItem>
            <MenuItem value={"Have Used"}>Have Used</MenuItem>
            <MenuItem value={"Using"}>Using</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Calendar multiple value={lastWarningMailDates} onChange={handleLastWarningMailDates}plugins={[<DatePanel/>]}/>
        </Grid>
        <Grid item xs={2}>
        <SaveButtons onSave={saveLastWarningMail} onCancel={cancelLastWarningMail} saved={lastWarningMailSaved}></SaveButtons>
            </Grid>
      </Grid>
    </Paper>
    </Grid>
  </Grid>
);
}

export default DeprecatedEndpoint;