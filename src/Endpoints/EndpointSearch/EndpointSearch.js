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

  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState("endpointName")
  const [order, setOrder] = useState("asc")
  const [search, setSearch] = useState("")
  const [date, setDate] = useState("2021-01-27")

  const cellStruct = [{name:"Name", id:"endpointName"},{name:"Developers", id:"developers"},{name:"Requests", id:"requests"},{name:"Deprecated", id:"deprecated"}]
  const handleDateChange = (date) => {
    setDate(date);
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
    const response = await fetchEndpoints(rowsPerPage,rowsPerPage*page,order,orderBy,search,date)
    const rows = response.data.map((row) => {
      return {id: row.endpointId,
              endpointName: row.endpointName,
              requests: row.requests,
              developers: row.developers,
              deprecated: row.deprecated}
    })
    setRows(rows)
    setTotal(response.total)
  },[page,rowsPerPage,order,orderBy,search,date])

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <div className="title-4 unmark-text">
          <h3>Endpoints</h3> 
        <i class="fas fa-camera"></i>
        </div>
      </Grid>
      <Grid item container spacing={3}  direction="row" justify="flex-start" alignItems="center">
        <Grid item>
          <TextField id="search" label="Search" margin="normal" align="left" onChange={handleSearch}/>
        </Grid>
 
        <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label="Count Requests From"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid item>
          <SearchTable rows={rows} total={total} page={page} rowsPerPage={rowsPerPage} 
          handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}
          cellStruct={cellStruct}
          orderBy={orderBy} order={order} handleRequestSort={handleRequestSort}/>
        </Grid>
  </Grid>
  );
}

export default EndpointSearch;


