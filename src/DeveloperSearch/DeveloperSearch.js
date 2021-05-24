
import { Button, TableContainer } from '@material-ui/core';
import SearchTable from '../SearchTable/SearchTable';
import './DeveloperSearch.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {fetchDevelopers} from '../Server/RequestHandler';
import React, { useState, useEffect } from 'react';

function App() {

  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState("developerName")
  const [order, setOrder] = useState("desc")
  const [search, setSearch] = useState("")

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
    const response = await fetchDevelopers(rowsPerPage,rowsPerPage*page,order,orderBy,search)
    setRows(response.data)
    setTotal(response.total)
  },[page,rowsPerPage,order,orderBy,search])
  return (
    <>
      <div className="title-4 unmark-text">
      Developer search
      </div> 
      <div className="search-field">
        <Grid container justify="space-around">
          <TextField id="search" label="Search" margin="normal" align="left" onChange={handleSearch}/>
        </Grid>
      </div>  
      <SearchTable rows={rows} total={total} page={page} rowsPerPage={rowsPerPage} 
      handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}
      cellStruct={[{name:"Name", id:"developerName"}, {name:"Mail", id:"developerMail"}]}
      orderBy={orderBy} order={order} handleRequestSort={handleRequestSort}/>
  </>
  );
}

export default App;


