const authoriseApi = async (ipAddr) => {
    let authUrl = `http://${ipAddr}/auth`;
    return await fetch("http://192.168.4.1/auth").then((res)=>{
        return  res.text()
    }).catch((e)=>{console.log("Error: ",e);});
};

const getStatusApi = async (ipAddr) => {
    let statusUrl = `http://${ipAddr}/status`;
    return await fetch("http://192.168.4.1/status").then((res)=>{
        console.log("RES:",res)
        return res.json()
    }).catch((e)=>{console.log("Error: ",e);});
}

export{ getStatusApi, authoriseApi };
