export const filterDashoard = (array, filterName) => {
    let arr = [];
    if(array && filterName) {
        arr =  array.filter(item => {
            let dashboardType = parseJson(item.Dashoard_Type);
            if(dashboardType && dashboardType.hasOwnProperty(filterName)){
                return item;
            }     
        })
    }
    return arr;
}

export const parseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

export const CnvrtObjOfObjIntoArrOfObj = (obj) => {
    let arr = [];
    if(obj){
       arr = Object.entries(obj).map(item => item[1]);
    }
    return arr;
}

export const findOjectInArr = (myArray,keyName, value) => {
    if(myArray && keyName) {
        for (var i=0; i < myArray.length; i++) {
                if (myArray[i][keyName] == value) {
                    return myArray[i];
                }
            }
    }
    else{
        return {};
    }
}

const currentTimeStamp = () => {
    return +new Date();
}

/**
 * 
 * @param {object need to update in device list} updateObj 
 * @param {*device object in which updation have to perform} selectedDevice 
 * @param {*array of all devices stored in DB} deviceArr 
 */
const updateDeviceList = (updateObj, selectedDevice, deviceArr) => {
    let updatedList = [],
        fields = Object.keys(updateObj),
        val = Object.values(updateObj);
    if(deviceArr.length){
        updatedList = deviceArr.map(item => {
            if(item.Mac === selectedDevice.Mac && fields.length){
                for(let i = 0; i < fields.length; i++){
                    item[fields[i]] = val[i];
                }
                item.Last_WS_Msg_Sent_Time_Stamp = currentTimeStamp();
            }
            return item;
        })
    }
    return updatedList;
}

/** 
 * this helps to create a device by providing all the below args, mac and ip is necessary.
*/
const createNewDevice = ({type, BSSID, hostName, SSID, IP, webSocket ="", lastMsgSent, lastMsgRec, lastHbeat, connected, lastState, dashboardType}) => {
    let val =  {
        Type : type ? type : "Device",
        Mac : BSSID,
        Host_Name : hostName ? hostName : "",
        SSID : SSID ? SSID : "",
        IP_Address : IP,
        Last_WS_Msg_Sent_Time_Stamp : lastMsgSent ? lastMsgSent : 0,
        Last_WS_Msg_Received_Time_Stam : lastMsgRec ? lastMsgRec : 0,
        Last_Heart_Time_Stamp : lastHbeat ? lastHbeat : 0,
        Connected : connected ? connected : false,
        Last_State : lastState ? lastState : "#637AFF",
        Web_Socket: webSocket,
        Dashoard_Type : dashboardType ? dashboardType : "",
    };
    return val;
};

const parseStringToObject = (value) =>{
    let result = value && JSON.parse(JSON.stringify(value)),
    ip = '',
    resCode = '',
    data = result.replace("{","").replace("}","").replace(/"/g, '');
    let properties = data.split(',');
    let obj = {};
    properties.forEach(function(property) {
        var tup = property.split(':');
        obj[tup[0].toLowerCase()] = tup[1];
    });
    if(obj && obj.status && (obj.status === 'WL_CONNECTED')){
        ip = obj["ip_add"];
    }
    if(obj && obj.res_code){
        resCode = obj["res_code"]
    }
    return {
        IP: ip,
        resCode: resCode
    };
}

export {
    currentTimeStamp,
    updateDeviceList,
    createNewDevice,
    parseStringToObject
}