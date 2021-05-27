import { TableContainer } from '@material-ui/core';
import SearchTable from '../../SearchTable/SearchTable';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import './EndpointSearch.scss';
import React, { useState, useEffect } from 'react';
import {fetchEndpoints} from '../../Server/RequestHandler';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

function EndpointSearch() {

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState("endpointName")
  const [order, setOrder] = useState("asc")
  const [search, setSearch] = useState("")
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  let timeout = null;
  const handleSearch = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setSearch(event.target.value)
  }, 500);
  };

  useEffect(async () => {
    const response = await fetchEndpoints(rowsPerPage,rowsPerPage*page,order,orderBy,search)
    const rows = response.data.map((row) => {
      return {id: row.endpointId,
              endpointName: row.endpointName,
              requests: row.requests}
    })
    setRows(rows)
    setTotal(response.total)
  },[page,rowsPerPage,order,orderBy,search])

  return (
    <>
      <div className="title-4 unmark-text">
        Endpoints
      </div>
      <Grid container justify="space-around">
        <TextField id="search" label="Search" margin="normal" onChange={handleSearch}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Count Requests"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      <SearchTable rows={rows} total={total} page={page} rowsPerPage={rowsPerPage} 
      handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}
      cellStruct={[{name:"Name", id:"endpointName"},{name:"Requests", id:"requests"}]}
      orderBy={orderBy} order={order} handleRequestSort={handleRequestSort}/>
  </>
  );
}

export default EndpointSearch;


