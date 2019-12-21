import { connectToDevice } from './Connector';
import { currentTimeStamp, addTimeIntoTimeStamp, findDiffBtTmStmp } from '../util/DateTimeUtil';
import { setDeviceListInWindow, getDeviceListFromWindow } from '../util/AppUtil';
import _ from 'underscore';

const webSocketHandler = (wsRes, currDevice, deviceList, deviceListAction) => {
    if (!wsRes) {
        let newList = deviceList.map(ele => {
            let deviceObj = _.clone(ele);
            if (deviceObj.Mac === currDevice.Mac) {
                deviceObj.Web_Socket = null
                deviceObj.Last_WS_Msg_Received_Time_Stamp = 0;
                deviceObj.Connected = false;
            }
            return deviceObj;
        });
        deviceListAction(newList);
        //return newList;
    }
    else{
        let newList = deviceList.map(ele => {
            let deviceObj = _.clone(ele);
            if (deviceObj.Mac === currDevice.Mac) {
                deviceObj.Web_Socket = wsRes
                deviceObj.Last_WS_Msg_Received_Time_Stamp = currentTimeStamp();
                deviceObj.Connected = true;
            }
            return deviceObj;
        });
        deviceListAction(newList);
        //return newList;
    }
}

const onMessageRecieved = (msg, currDevice, deviceList,deviceListAction) => {
    console.log("onMessageRecieved----->", msg);
    if(msg){
        let timeStamp = currentTimeStamp();
        let newList = deviceList.map(ele => {
            let deviceObj = _.clone(ele);
            if (deviceObj.Mac === currDevice.Mac) {
                deviceObj.Last_WS_Msg_Received_Time_Stamp = timeStamp;
            }
            return deviceObj;
        });
        //deviceListAction(newList);
        deviceListAction(newList);
    }
    
}

const heartBeatHandler = async (deviceList, updateList) => {
    let newList = [];
    for (let i = 0; i < deviceList.length; i++) {
        let deviceObj = _.clone(deviceList[i]);
        if (deviceObj.Web_Socket && Object.entries(deviceObj.Web_Socket)) { 
            let ts = currentTimeStamp();
            let diff = findDiffBtTmStmp(deviceObj.Last_WS_Msg_Received_Time_Stamp, ts);
            if (diff >= 3 && deviceObj.Web_Socket && deviceObj.Web_Socket.send) {
                deviceObj.Web_Socket.send("Heartbeat");
            }
        }
        else {
            await connectToDevice(deviceObj.IP_Address, wsRes => {
            //   if(wsRes){
            //     deviceObj.Web_Socket = wsRes
            //     deviceObj.Last_WS_Msg_Received_Time_Stamp = currentTimeStamp();
            //     deviceObj.Connected = true;
            //     console.log("deviceObj---->>1...",deviceObj);
            //   }
            //   else{
            //     deviceObj.Web_Socket = null
            //     deviceObj.Last_WS_Msg_Received_Time_Stamp = 0;
            //     deviceObj.Connected = false;
            //   }
            },
            (mgsRecievedRes, wsRes) => {
               if(mgsRecievedRes && wsRes){
                   console.log("mgsRecievedRes: ",mgsRecievedRes);
                    deviceObj.Web_Socket = wsRes
                    deviceObj.Last_WS_Msg_Received_Time_Stamp = currentTimeStamp();
                    deviceObj.Connected = true;
                    newList.push(deviceObj);
                    if(i === deviceList.length - 1){
                        updateList(newList);
                    }
               }
            });
        }
    }
}

export {
    heartBeatHandler
}