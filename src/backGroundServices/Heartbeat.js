import { connectToDevice } from "./Connector"
import {
    getCurrentTimeStamp,
    addTimeIntoTimeStamp,
    findTimestampDiffInSec,
} from "../util/DateTimeUtil"
import _ from "underscore"

let dataChanged = false

const declareDisconnected = item => {
    item.Web_Socket = null
    item.Last_WS_Msg_Received_Time_Stamp = 0
    item.Connected = false
    dataChanged = true
}

const heartBeatHandler = async (deviceList, updateList) => {
    // if(deviceList.lenght>0){
    change = false
    deviceList.map((item, i) => {
        console.log(i)
        //console.log('test :: ' + i);
        if (item.Web_Socket && Object.entries(item.Web_Socket)) {
            console.log("Mac :: " + item.Mac)
            let ts = getCurrentTimeStamp()
            let diff = findTimestampDiffInSec(item.Last_WS_Msg_Received_Time_Stamp, ts)
            //console.log("DIFFERENCE , ", diff)
            if (diff > 8) {
                declareDisconnected(item)
            } else if (diff >= 3 && item.Web_Socket && item.Web_Socket.send) {
                item.Web_Socket.send("Heartbeat")
            }
        } else {
            console.log("device not connected")
            connectToDevice(
                item.IP_Address,
                wsRes => {
                    //console.log('FROM HEARTBEAT');
                },
                (mgsRecievedRes, wsRes) => {
                    if (wsRes) {
                        if (mgsRecievedRes && wsRes) {
                            console.log("ws_msg:: " + mgsRecievedRes.data)
                            item.Web_Socket = wsRes
                            item.Last_WS_Msg_Received_Time_Stamp = getCurrentTimeStamp()
                            item.Connected = true
                            dataChanged = true
                        }
                        /*  if (i === deviceList.length - 1) {
                            updateList(deviceList)
                        } */
                    } else {
                        declareDisconnected(item)
                    }
                },
            )
        }
        if (i === deviceList.length - 1 && dataChanged) {
            console.log("changing data in last Heartbeat cycle")
            updateList(deviceList)
        }
        //if (item.Connected) console.log("Connected")
        //else console.log("Not Connected")
    })
}

export { heartBeatHandler }
