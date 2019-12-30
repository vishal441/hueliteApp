import { connectToDevice } from './Connector';
import { currentTimeStamp, addTimeIntoTimeStamp, findDiffBtTmStmp } from '../util/DateTimeUtil';
import _ from 'underscore';

const heartBeatHandler = async (deviceList, updateList) => {
    for (let i = 0; i < deviceList.length; i++) {
        if (deviceList[i].Web_Socket && Object.entries(deviceList[i].Web_Socket)) {
            let ts = currentTimeStamp();
            let diff = findDiffBtTmStmp(deviceList[i].Last_WS_Msg_Received_Time_Stamp, ts);
            if(diff > 10){
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
            await connectToDevice(deviceList[i].IP_Address, wsRes => { },
                (mgsRecievedRes, wsRes) => {
                    let ts = currentTimeStamp();
                    if (mgsRecievedRes && wsRes) {
                        deviceList[i].Web_Socket = wsRes
                        deviceList[i].Last_WS_Msg_Received_Time_Stamp = ts;
                        deviceList[i].Connected = true;
                    }
                    if (i === deviceList.length - 1) {
                        updateList(deviceList);
                    }
                });
        }
    }
}

export {
    heartBeatHandler
}