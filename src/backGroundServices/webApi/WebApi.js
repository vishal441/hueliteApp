const authoriseApi = async ipAddr => {
    let authUrl = `http://${ipAddr}/auth`
    //console.log("auth URL: ",authUrl);
    return await fetch(authUrl)
        .then(res => {
            return res.text()
        })
        .catch(e => {
            // console.log("Error: ", e)
        })
}

const getStatusApi = async ipAddr => {
    let statusUrl = `http://${ipAddr}/status`
    return await fetch(statusUrl)
        .then(res => {
            return res.json()
        })
        .catch(e => {
            console.log("Error: ", e)
        })
}

const pairDeviceApi = async (wifiName, password) => {
    return await fetch("http://192.168.4.1/config", {
        method: "POST",
        headers: {
            Accept: "application/json, application/text",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `config=wifi_connect&ssid=${wifiName}&pass=${password}`,
    })
        .then(res => {
            let resText = res.text()
            //console.log("pairDeviceApi res : ",resText);
            return resText
        })
        .catch(e => {
            console.log("Error: ", e)
        })
}

const saveWifiConfigApi = async cb => {
    return await fetch("http://192.168.4.1/config", {
        method: "POST",
        headers: {
            Accept: "application/json, application/text",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `config=save_wifi_cnf`,
    })
        .then(res => {
            let resText = res.text()
            console.log("saveWifiConfigApi res : ", resText)
            return resText
        })
        .catch(e => {
            console.log("Error: ", e)
        })
}

const modesApi = async (IP, mode_msg, cbRes) => {
    let modesUrl = `http://${IP}/config`
    await fetch(modesUrl, {
        method: "POST",
        headers: {
            Accept: "application/json, application/text",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `config=mode_start&mode_msg=${mode_msg}`,
    })
        .then(res => {
            //res.json()
            let resText = res.text()
            console.log("modesApi res : ", resText)
            if (resText == "rainbow") return cbRes("RAINBOW")
            else return cbRes("ELSE")
        })
        .catch(e => {
            console.log("Error: ", e)
            return cbRes("ERR")
        })
}

export { getStatusApi, authoriseApi, pairDeviceApi, saveWifiConfigApi, modesApi }
