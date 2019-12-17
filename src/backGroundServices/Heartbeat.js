import { connectToDevice } from './Connector';
import { currentTimeStamp, addTimeIntoTimeStamp, findDiffBtTmStmp } from '../util/DateTimeUtil';
import { setDeviceListInWindow, getDeviceListFromWindow } from '../util/AppUtil';
import _ from 'underscore';

const webSocketHandler = (wsRes, currDevice) => {
    if (!wsRes) {
        let newList = DeviceList.map(ele => {
            let deviceObj = _.clone(ele);
            if (deviceObj.Mac === currDevice.Mac) {
                deviceObj.Web_Socket = null
                deviceObj.Last_WS_Msg_Received_Time_Stamp = 0;
            }
            return deviceObj;
        });
        setDeviceListInWindow(newList);
    }
}

const onMessageRecieved = (msg, currDevice) => {
    let DeviceList = getDeviceListFromWindow();
    if(msg){
        let timeStamp = currentTimeStamp();
        let newList = DeviceList.map(ele => {
            let deviceObj = _.clone(ele);
            if (deviceObj.Mac === currDevice.Mac) {
                deviceObj.Last_WS_Msg_Received_Time_Stamp = timeStamp;
            }
            return deviceObj;
        });
        setDeviceListInWindow(newList);
    }
    
}

const heartBeatHandler = async (deviceList, deviceListAction) => {
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
            let wsObj = await connectToDevice(deviceObj.IP_Address, wsRes => {
                webSocketHandler(wsRes, deviceObj);
                deviceObj.Web_Socket = wsObj;
            },
            mgsRecievedRes => {
                 onMessageRecieved(mgsRecievedRes, deviceObj);
            });

        }
    }
}

export {
    heartBeatHandler
}