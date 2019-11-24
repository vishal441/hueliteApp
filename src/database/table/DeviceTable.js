
import {DeviceSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertDevices = (deviceArr) => {
    let array = [];
    for(let i = 0; i < deviceArr.length; i++){
        let item = {};
        item.Mac = deviceArr[i].BSSID,
        item.Host_Name = "",
        item.SSID = deviceArr[i].SSID,
        item.IP_Address = "",
        item.Last_WS_Msg_Sent_Time_Stamp = 0,
        item.Last_WS_Msg_Received_Time_Stam = 0,
        item.Last_Heart_Time_Stamp = 0,
        item.Connected = false,
        item.Last_State = ""
        array.push(item);
    }
    insertOrUpdateQuery(DeviceSchema.name,array, cb => {
    //console.log("insertDevices......",cb);
   });
  
}

export const getDeviceListFromDb = async(callback) => {
    //let filter = `SSID = "HUE_OWD3_DC:3A" `
    getQuery(DeviceSchema.name,false, cb => {
        console.log("getDeviceListFromDb......",cb);
        callback (cb);
    })
}

export const deleteDeviceTable = () => {
    deleteSchema([DeviceSchema.name], cb => {
        //console.log("deleteDeviceTale......",cb);
    });
}