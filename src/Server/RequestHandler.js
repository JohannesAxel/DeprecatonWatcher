async function fetchEndpoints(rowsPerPage,offset,order,orderBy,search,date) {

//server simul
    
    const endpointResponse =  await fetch("Endpoints.json")
    .then(response => {
        return response.json();
    })

    const requestResponse =  await fetch("Requests.json")
    .then(response => {
        return response.json();
    })

    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.endpointId === val ? a + 1 : a), 0);

    var data = endpointResponse.data.filter(data => data.endpointName.toLowerCase().includes(search.toLowerCase()))
    const total = data.length
    data = data.map(data => {
        return {...data, requests: countOccurrences(requestResponse.data, data.endpointId)}
    })

    data.sort((firstEl, secondEl) => {
        var val
        if (typeof(firstEl?.[orderBy]) === "string"){
            val = firstEl?.[orderBy].localeCompare(secondEl?.[orderBy])
        }
        if(typeof(firstEl?.[orderBy]) === "number"){
            val = firstEl?.[orderBy] - secondEl?.[orderBy]
            
        }
        return order === 'asc' ? val : -val
    })
    

    var data = data.slice(offset,rowsPerPage + offset)

    
    
    return {
        total: total,
        data: data
        }
  }

  async function fetchDevelopers(rowsPerPage,offset,order,orderBy,search) {
    const response =  await fetch("Developers.json")
    .then(response => {
        return response.json();
    })
    
    var data = response.data.filter(data => data.developerName.toLowerCase().includes(search.toLowerCase()))
    const total = data.length

    data.sort((firstEl, secondEl) => {
        const val = firstEl?.[orderBy].localeCompare(secondEl?.[orderBy])
        return order === 'asc' ? val : -val
    })
    data = data.slice(offset,rowsPerPage + offset)
    return {
        total: total,
        data: data
        }
  }

  function getDeveloper(id){ 

  }

  function getEndpoint(id){


  }
  
  export { fetchEndpoints, fetchDevelopers, getDeveloper, getEndpoint }