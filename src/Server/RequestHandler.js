async function fetchDeveloper(id) {




    const developerResponse =  await fetch("http://localhost:3000/Developers.json")
    .then(response => {
        return response.json();
    })
    var developerData = developerResponse.data.filter(data => data.developerId == id)[0]

    const requestResponse = await fetch("http://localhost:3000/Requests.json")
    .then(response => {
        return response.json();
    })

    const endpointResponse = await fetch("http://localhost:3000/Endpoints.json")
    .then(response => {
        return response.json();
    })



    var requestData = requestResponse.data.filter(data => data.developerId == id)



    var requests = {}

    requestData.forEach(request => {
        const endpoint = endpointResponse.data.filter(data => data.endpointId == request.endpointId)[0]
        if(!(request.endpointId in requests)) {
            requests[request.endpointId] = {
                name: endpoint.endpointName,
                data: []
            }
        }
        requests[request.endpointId].data.push([request.date, request.sum])
    });
    /*var requests = {
        "requestId": {  
            requestName: "name",
            requestsByDay:
            [
                {date: "date", sum: "sum"}
            ]
        }
    }
*/  var requestArray = [];
        for(var o in requests) {
            requestArray.push(requests[o]);
        }
    return {
        data:
        {
            developerName:  developerData.developerName,
            requests:       requestArray
        }
    }
}

async function fetchEndpoint (id){
    


    const endpointResponse =  await fetch("http://localhost:3000/Endpoints.json")
    .then(response => {
        return response.json();
    })
    var endpointData = endpointResponse.data.filter(data => data.endpointId == id)[0]
    console.log("--------------")
    console.log(id)
    console.log(endpointData)
    console.log("--------------")

    const requestResponse = await fetch("http://localhost:3000/Requests.json")
    .then(response => {
        return response.json();
    })

    const developerResponse = await fetch("http://localhost:3000/Developers.json")
    .then(response => {
        return response.json();
    })


    var requestData = requestResponse.data.filter(data => data.endpointId == id)

    var requests = {}

    requestData.forEach(request => {
        const developer = developerResponse.data.filter(data => data.developerId == request.developerId)[0]
        if(!(request.developerId in requests)) {
            requests[request.developerId] = {
                name: developer.developerName,
                data: []
            }
        }
        requests[request.developerId].data.push([request.date, request.sum])
    });
    /*var requests = {
        "requestId": {  
            requestName: "name",
            requestsByDay:
            [
                {date: "date", sum: "sum"}
            ]
        }
    }
*/  var requestArray = [];
        for(var o in requests) {
            requestArray.push(requests[o]);
        }
    return {
        data:
        {
            endpointName:  endpointData.endpointName,
            requests:       requestArray
        }
    }
}

async function fetchEndpoints(rowsPerPage,offset,order,orderBy,search,date) {

//server simul
    
    const endpointResponse =  await fetch("http://localhost:3000/Endpoints.json")
    .then(response => {
        return response.json();
    })

    const requestResponse =  await fetch("http://localhost:3000/Requests.json")
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

    const response =  await fetch("http://localhost:3000/Developers.json")
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

  
  export { fetchEndpoints, fetchDevelopers, fetchDeveloper, fetchEndpoint}