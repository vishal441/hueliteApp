import axios from "axios"

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

const getWiFiList = async cbRes => {
    await axios
        .post("http://192.168.4.1/config", /* <--urlEncodedParameters--> */ "config=wifi_scan", {
            headers: {
                Accept: "application/json, application/text",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then(response => {
            const d = response.data
            let { Status } = d
            wifiArray = []
            console.log(":::::" + Status)
            /* Networks.map(item => {
                console.log(":::::" + item.ssid)
                let wifiName = {}
                wifiName["value"] = item.SSID
                wifiArray.push(wifiName)
            }) */
            cbRes(response.data)
        })
        .catch(error => {
            console.log("axios error:", error)
            cbRes(null)
        })
        .finally(function() {})
}

const loginAPI = async (_username, _pass) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .post(
                "https://www.huelite.in/user/authenticate",
                {
                    username: _username,
                    password: _pass,
                },
                { timeout: 2000 },
            )
            .then(response => {
                console.log(
                    "axios response-- " +
                        "LoginAPI_status::" +
                        response.status +
                        "LoginAPI_body::" +
                        response.data,
                )
                resolve(response)
                //cbRes("pass")
            })
            .catch(error => {
                console.log("axios error:", error.response.data)
                reject(error.response.data)
            })
    })
}

const signUpAPI = async (_username, _pass) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .post(
                "https://www.huelite.in/user/register",
                {
                    username: _username,
                    password: _pass,
                },
                { timeout: 2000 },
            )
            .then(response => {
                console.log(
                    "axios response-- " +
                        "LoginAPI_status::" +
                        response.status +
                        "LoginAPI_body::" +
                        response.data,
                )
                resolve(response)
                //cbRes("pass")
            })
            .catch(error => {
                console.log("axios error:", error.response.data)
                reject(error.response.data)
            })
    })
}

export {
    signUpAPI,
    loginAPI,
    getWiFiList,
    getStatusApi,
    authoriseApi,
    pairDeviceApi,
    saveWifiConfigApi,
    modesApi,
}
