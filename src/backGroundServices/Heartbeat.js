import { connectToDevice } from './Connector';
import { getCurrentTimeStamp, addTimeIntoTimeStamp, findTimestampDiffInSec } from '../util/DateTimeUtil';
import _ from 'underscore';

const heartBeatHandler = async (deviceList, updateList) => {
    console.log("HeatBeat Device list: ",deviceList);
    // if(deviceList.lenght>0){
        for (let i = 0; i < deviceList.length; i++) {
            if (deviceList[i].Web_Socket && Object.entries(deviceList[i].Web_Socket)) {
                let ts = getCurrentTimeStamp();
                let diff = findTimestampDiffInSec(deviceList[i].Last_WS_Msg_Received_Time_Stamp, ts);
                console.log("DIFFERENCE , ",diff);
                if(diff > 8){
                    deviceList[i].Web_Socket = null
                    deviceList[i].Last_WS_Msg_Received_Time_Stamp = 0;
                    deviceList[i].Connected = false;
                    if (i === deviceList.length - 1) {
                        updateList(deviceList); 
                    }
                }
                else if (diff >= 3 && deviceList[i].Web_Socket && deviceList[i].Web_Socket.send) {
                    deviceList[i].Web_Socket.send("Heartbeat");
                }
                
            }
            else {
                console.log("IDHAR AAYA");
                await connectToDevice(deviceList[i].IP_Address, wsRes => { console.log("FROM HEARTBEAT")},
                    (mgsRecievedRes, wsRes) => {
                        if (mgsRecievedRes && wsRes) {
                            deviceList[i].Web_Socket = wsRes
                            deviceList[i].Last_WS_Msg_Received_Time_Stamp = getCurrentTimeStamp();
                            deviceList[i].Connected = true;
                        }
                        if (i === deviceList.length - 1) {
                            updateList(deviceList);
                        }
                    });
            }
        }
    // }
}

export {
    heartBeatHandler
}