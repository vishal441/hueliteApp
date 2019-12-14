const authoriseApi = async (ipAddr) => {
    let authUrl = `http://${ipAddr}/auth`;
    return await fetch(authUrl).then((res)=>{
        console.log("RESPONSE: ",res);
        return  res.text();
    }).catch((e)=>{console.log("Error: ",e);});
};

const getStatusApi = async (ipAddr) => {
    let statusUrl = `http://${ipAddr}/status`;
    return await fetch(statusUrl).then((res)=>{
        return res.json();
    }).catch((e)=>{console.log("Error: ",e);});
}

const pairDeviceApi = async ()=>{
    return await fetch("http://192.168.4.1/config",
    {
        method: "POST",
        headers: {
            "Accept": "application/json, application/text",
            "Content-Type" : "application/x-www-form-urlencoded",
        },
        body: "config=wifi_connect&ssid=Homelink1&pass=Ioplmkjnb@1"
        
    }).then((res)=>{
        return  res.text();
    }).catch((e)=>{console.log("Error: ",e);});
};



export{ getStatusApi, authoriseApi, pairDeviceApi};
