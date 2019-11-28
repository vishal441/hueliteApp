
import {DeviceSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertDevices = () => {
    let array = [], deviceArr = [1,2];
    let dashboardArr = {Bedroom:{Type_Name: "Bedroom"}}
    for(let i = 0; i < deviceArr.length; i++){
        let item = {};
        item.Type = "Group";
        item.Mac = "587658735";
        item.Host_Name = "";
        item.SSID = "ytwr85487";
        item.IP_Address = "";
        item.Last_WS_Msg_Sent_Time_Stamp = 30105435;
        item.Last_WS_Msg_Received_Time_Stam = 1189109;
        item.Last_Heart_Time_Stamp = 5749875054;
        item.Connected = false;
        item.Last_State = "";
        item.Dashoard_Type = JSON.stringify(dashboardArr);
        array.push(item);
    }
    insertOrUpdateQuery(DeviceSchema.name,array, cb => {
    //console.log("insertDevices......",cb);
   });
  
}

export const getDeviceListFromDb = async(callback) => {
    //let filter = `SSID = "HUE_OWD3_DC:3A" `
    getQuery(DeviceSchema.name,false, cb => {
        //console.log("getDeviceListFromDb......",cb);
        callback (cb);
    })
}

export const deleteDeviceTable = () => {
    deleteSchema([DeviceSchema.name], cb => {
        //console.log("deleteDeviceTale......",cb);
    });
}