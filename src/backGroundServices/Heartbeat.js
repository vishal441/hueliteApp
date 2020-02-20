import {connectToDevice} from './Connector';
import {
  getCurrentTimeStamp,
  addTimeIntoTimeStamp,
  findTimestampDiffInSec,
} from '../util/DateTimeUtil';
import _ from 'underscore';

const heartBeatHandler = async (deviceList, updateList) => {
  console.log('HeatBeat Device list: ', deviceList);
  // if(deviceList.lenght>0){
  deviceList.map((item, i) => {
    console.log('test :: ' + i);
    console.log('Mac :: ' + item.Mac);
    if (item.Web_Socket && Object.entries(item.Web_Socket)) {
      let ts = getCurrentTimeStamp();
      let diff = findTimestampDiffInSec(
        item.Last_WS_Msg_Received_Time_Stamp,
        ts,
      );
      console.log('DIFFERENCE , ', diff);
      if (diff > 8) {
        item.Web_Socket = null;
        item.Last_WS_Msg_Received_Time_Stamp = 0;
        item.Connected = false;
        if (i === deviceList.length - 1) {
          updateList(deviceList);
        }
      } else if (diff >= 3 && item.Web_Socket && item.Web_Socket.send) {
        item.Web_Socket.send('Heartbeat');
      }
    } else {
      console.log('IDHAR AAYA');
      connectToDevice(
        item.IP_Address,
        wsRes => {
          console.log('FROM HEARTBEAT');
        },
        (mgsRecievedRes, wsRes) => {
          if (mgsRecievedRes && wsRes) {
            item.Web_Socket = wsRes;
            item.Last_WS_Msg_Received_Time_Stamp = getCurrentTimeStamp();
            item.Connected = true;
          }
          if (i === deviceList.length - 1) {
            updateList(deviceList);
          }
        },
      );
    }
    if (item.Connected) console.log('Connected');
    else console.log('Not Connected');
  });
};

export {heartBeatHandler};
