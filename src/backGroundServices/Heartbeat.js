import { connectToDevice } from "./Connector";
import {
  getCurrentTimeStamp,
  addTimeIntoTimeStamp, //TODO: REMOVE THIS UNUSED VARIABLE
  findTimestampDiffInSec
} from "../util/DateTimeUtil";
import NetInfo from "@react-native-community/netinfo";
import _ from "underscore";
import { connect, useSelector } from "react-redux";

let dataChanged = false;

const declareDisconnected = item => {
  item.Web_Socket = null;
  item.Last_WS_Msg_Received_Time_Stamp = 0;
  item.Connected = false;
  dataChanged = true;
};

const heartBeatHandler = async (deviceList, updateList) => {
  let debug = true;
  //const Dlist = useSelector(state => state.deviceList)
  //console.log("---" + deviceList.length)
  // if(deviceList.lenght>0){
  //if (!currSSID) console.log("HB::no ssid")
  //else {

  //console.log("HB:: " + netInfo.type)
  change = false;
  deviceList.map((item, i) => {
    let debug = true;
    if (item.Web_Socket && Object.entries(item.Web_Socket)) {
      let ts = getCurrentTimeStamp();
      let diff = findTimestampDiffInSec(
        item.Last_WS_Msg_Received_Time_Stamp,
        ts
      );
      //console.log("HB DIFFERENCE:: ", diff + " for device:: " + item.HSV.h)
      if (diff > 8000) {
        declareDisconnected(item);
      } else if (
        diff >= 3000 &&
        item.Web_Socket /*  && item.Web_Socket.send */
      ) {
        item.Web_Socket.send("Heartbeat");
      }
    } else {
      console.log("device not connected::Attempting Connect");
      connectToDevice(
        item.IP_Address,
        wsRes => {
          //console.log('FROM HEARTBEAT');
        },
        (mgsRecievedRes, wsRes) => {
          if (wsRes) {
            if (mgsRecievedRes && wsRes) {
              console.log("ws_msg:: " + mgsRecievedRes.data);
              item.Web_Socket = wsRes;
              item.Last_WS_Msg_Received_Time_Stamp = getCurrentTimeStamp();
              item.Connected = true;
              dataChanged = true;
            }
            /*  if (i === deviceList.length - 1) {
                            updateList(deviceList)
                        } */
          } else {
            declareDisconnected(item);
          }
        },
        err_msg => {
          {
            debug && console.log("WS_ERR::" + err_msg);
          }
        }
      );
    }
    if (i === deviceList.length - 1 && dataChanged) {
      //console.log("changing data in last Heartbeat cycle")
      updateList(deviceList);
    }
    //if (item.Connected) console.log("Connected")
    //else console.log("Not Connected")
  });
};
//}

export { heartBeatHandler };

/* NetInfo.fetch()
        .then(state => {
            console.log("--Connection type", state.type)
            //console.log("Is connected--", state.details.ipAddress)
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: " + error.message)
        }) */
