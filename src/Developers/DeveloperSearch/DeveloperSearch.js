
import { Button, TableContainer } from '@material-ui/core';
import SearchTable from '../../SearchTable/SearchTable';
import './DeveloperSearch.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {fetchDevelopers} from '../../Server/RequestHandler';
import React, { useState, useEffect } from 'react';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DeveloperSearch() {
  const [rows, setRows] = useState([]) //Data rows
  const [total, setTotal] = useState(0) //Total data rows
  const [page, setPage] = useState(0) //Page of table
  const [rowsPerPage, setRowsPerPage] = useState(10) //Rows per table page
  const [orderBy, setOrderBy] = useState("developerName") //Column to order from
  const [order, setOrder] = useState("asc") //asc or desc
  const [search, setSearch] = useState("") //Search string
  const [date, setDate] = useState("2021-01-27") //Date to filter "Count Requests From"

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

  //Sends a new requests when either of theese change: [page,rowsPerPage,order,orderBy,search]
  useEffect(async () => {
    const response = await fetchDevelopers(rowsPerPage,rowsPerPage*page,order,orderBy,search,date)
    const rows = response.data.map((row) => {
      return {id: row.developerId,
              developerName: row.developerName,
              requests: row.requests,
              endpoints: row.endpoints}
    })
    setRows(rows)
    setTotal(response.total)
  },[page,rowsPerPage,order,orderBy,search])
  
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <div className="title-4 unmark-text">
          <h3>Developers</h3>
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
      cellStruct={[{name:"Name", id:"developerName"},{name:"Endpoints",id:"endpoints"}, {name:"Requests", id:"requests"}]}
      orderBy={orderBy} order={order} handleRequestSort={handleRequestSort}/>
        </Grid>  
  </Grid>
  );
}

export default DeveloperSearch;


