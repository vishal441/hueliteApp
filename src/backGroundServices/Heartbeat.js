import { connectToDevice } from './Connector';
import { currentTimeStamp, addTimeIntoTimeStamp } from '../util/DateTimeUtil';
import _ from 'underscore';


const heartBeatHandler = async (deviceList, deviceListAction) => {
    console.log("deviceObjdeviceObj-------->...1", deviceList);
    let newList = [];
    for (let i = 0; i < deviceList.length; i++) {
        let deviceObj = _.clone(deviceList[i]);
        if (deviceObj.Web_Socket && Object.entries(deviceObj.Web_Socket)) {
            console.log("deviceObjdeviceObj-------->...2", deviceObj);

        }
        else {
            let wsObj = await connectToDevice(deviceObj.IP_Address, () => { }, OnMessageRecieved => {
                if(OnMessageRecieved){
                    let timeStamp = currentTimeStamp();
                    deviceObj.Last_WS_Msg_Received_Time_Stamp = timeStamp;
                    let addTime = addTimeIntoTimeStamp(timeStamp, 10);
                    console.log("date time ----> ", timeStamp, addTime);
                }
            });
            deviceObj.Web_Socket = wsObj;
        }
        newList.push(deviceObj);
    }
    console.log("new list----->", newList)
}

export {
    heartBeatHandler
}