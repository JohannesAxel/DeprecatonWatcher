
function deleteDeprecations(id){
    var sessionResponse = JSON.parse(window.sessionStorage.getItem("deprecations"))
    const newData = sessionResponse.data.reduce(function(result, element) {
        if(element.endpointId != id){
            result.push(element);
        }
        return result;
      }, []);

      sessionResponse.data = newData
      window.sessionStorage.setItem("deprecations", JSON.stringify(sessionResponse))
}


function postDeprecations(id){
    var sessionResponse = JSON.parse(window.sessionStorage.getItem("deprecations"))
    sessionResponse.data.push(
        {
            "deprecationId": Math.floor(Math.random() * 100),
            "endpointId":id,
            "firstMail":"",
            "reminderMail":"",
            "lastWarningMail":"",
            "firstMailReq":"Everyone",
            "reminderMailReq":"Using",
            "lastWarningMailReq":"Using",
            "removalDate":"2021-11-29",
            "firstMailDates":[],
            "reminderMailDates":[],
            "lastWarningMailDates":[]
        }
    )
    window.sessionStorage.setItem("deprecations", JSON.stringify(sessionResponse))
}


function patchDeprecations(id,attr,value){

    var sessionResponse = JSON.parse(window.sessionStorage.getItem("deprecations"))
    const newSessionData = sessionResponse.data.map((data) => {
      if(data.deprecationId == id){
        data[attr] = value
      }
      return data
    })
    sessionResponse.data = newSessionData
    window.sessionStorage.setItem("deprecations", JSON.stringify(sessionResponse))
}

async function fetchDeveloper(id) {

    const developerResponse =  JSON.parse(window.sessionStorage.getItem("developers"))
    var developerData = developerResponse.data.filter(data => data.developerId == id)[0]

    const requestResponse = JSON.parse(window.sessionStorage.getItem("requests"))

    const endpointResponse = JSON.parse(window.sessionStorage.getItem("endpoints"))



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

      var requestArray = [];
        for(var o in requests) {
            requestArray.push(requests[o]);
        }
        console.log("GET Developer Response",{data:
            {
                developerName:  developerData.developerName,
                requests:       requestArray
            }
        })
    return {
        data:
        {
            developerName:  developerData.developerName,
            requests:       requestArray
        }
    }
}

async function fetchEndpoint (id){
    

    const endpointResponse = JSON.parse(window.sessionStorage.getItem("endpoints"))
    
    var endpointData = endpointResponse.data.filter(data => data.endpointId == id)[0]

    const deprecationsResponse = JSON.parse(window.sessionStorage.getItem("deprecations"))

    const deprecationData = deprecationsResponse.data.filter(data => data.endpointId == id)[0]

    const requestResponse = JSON.parse(window.sessionStorage.getItem("requests"))

    const developerResponse = JSON.parse(window.sessionStorage.getItem("developers"))

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
        requests[request.developerId].data.push([new Date(request.date), request.sum])
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
        console.log("GET Endpoint Response",JSON.stringify({data:
            {
                endpointName:  endpointData.endpointName,
                requests:       requestArray,
                deprecationData: deprecationData
            }}, null, 2))
    return {
        data:
        {
            endpointName:  endpointData.endpointName,
            requests:       requestArray,
            deprecationData: deprecationData
        }
    }
}

async function fetchEndpoints(rowsPerPage,offset,order,orderBy,search,date) {
    console.log("GET Endpoints request", JSON.stringify({
        rowsPerPage: rowsPerPage,
        offset: offset,
        order: order,
        orderBy: orderBy,
        search: search,
        date: date
    }, null, 2))

//server simul
    const endpointResponse =  JSON.parse(window.sessionStorage.getItem("endpoints"))

    const requestResponse =  JSON.parse(window.sessionStorage.getItem("requests"))

    const deprecationsResponse = JSON.parse(window.sessionStorage.getItem("deprecations"))

    const countOccurrences = (arr, val) => arr.reduce((a, v) => 
    ((v.endpointId === val && (new Date(date)).getTime()< (new Date(v.date)).getTime()) ? a + v.sum : a), 0);
    function countDevelopers (arr,val) {
        var uniqueDevelopers = []
        return arr.reduce((a, v) => 
            {
                if(v.endpointId === val && (new Date(date)).getTime()< (new Date(v.date)).getTime()){
                    if (uniqueDevelopers.includes(v.developerId)){
                        return a
                    }
                    uniqueDevelopers.push(v.developerId)
                    return a + 1
                }
                return a
            },0)        
    } 
    var data = endpointResponse.data.filter(data => data.endpointName.toLowerCase().includes(search.toLowerCase()))
    const total = data.length
    data = data.map(data => {
        return {...data,
            requests: countOccurrences(requestResponse.data, data.endpointId),
            developers: countDevelopers(requestResponse.data,data.endpointId),
            deprecated: (deprecationsResponse.data.filter(e => e.endpointId == data.endpointId).length > 0) ? "Yes":"No"
            }
    })

    
    data.sort((firstEl, secondEl) => {
        var val
        var firstVal = firstEl?.[orderBy]
        var secondVal= secondEl?.[orderBy]
        if (typeof(firstVal) === "string"){
            val = firstVal.localeCompare(secondVal)
        }
        if(typeof(firstVal) === "number"){
            val = firstVal - secondVal
        }
        if(typeof(firstVal) === "boolean"){
            val = firstVal ? -1 : 1
        }
        return order === 'asc' ? val : -val
    })

    var data = data.slice(offset,rowsPerPage + offset)

    console.log("GET Endpoints Response",JSON.stringify({
        total: total,
        data: data
    }, null, 2))
    
    return {
        total: total,
        data: data
        }
  }

  async function fetchDevelopers(rowsPerPage,offset,order,orderBy,search,date) {

    console.log("GET Developers request", JSON.stringify({
        rowsPerPage: rowsPerPage,
        offset: offset,
        order: order,
        orderBy: orderBy,
        search: search,
        date: date
    }, null, 2))

    const response =  JSON.parse(window.sessionStorage.getItem("developers"))
    const requestResponse =  JSON.parse(window.sessionStorage.getItem("requests"))
    var data = response.data.filter(data => data.developerName.toLowerCase().includes(search.toLowerCase()))
    const total = data.length

    const countOccurrences = (arr, val) => arr.reduce((a, v) => 
    ((v.developerId === val && (new Date(date)).getTime()< (new Date(v.date)).getTime()) ? a + v.sum : a), 0);
    function countEndpoints (arr,val) {
        var uniqueEndpoints = []
        return arr.reduce((a, v) => 
            {
                if(v.developerId === val && (new Date(date)).getTime()< (new Date(v.date)).getTime()){
                    if (uniqueEndpoints.includes(v.endpointId)){
                        return a
                    }
                    uniqueEndpoints.push(v.endpointId)
                    return a + 1
                }
                return a
            },0)
    }
    data = data.map(data => {
        return {...data,
            requests: countOccurrences(requestResponse.data, data.developerId),
            endpoints: countEndpoints(requestResponse.data, data.developerId)
            }
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
    data = data.slice(offset,rowsPerPage + offset)

    console.log("GET Developers response", JSON.stringify({
        total: total,
        data: data
    }, null, 2))

    return {
        total: total,
        data: data
        }
  }

  
  export { fetchEndpoints, fetchDevelopers, fetchDeveloper, fetchEndpoint, patchDeprecations, postDeprecations, deleteDeprecations}