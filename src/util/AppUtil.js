 const filterDashoard = (array, filterName) => {
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

 const parseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

 const CnvrtObjOfObjIntoArrOfObj = (obj) => {
    let arr = [];
    if(obj){
       arr = Object.entries(obj).map(item => item[1]);
    }
    return arr;
}

 const findOjectInArr = (myArray,keyName, value) => {
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

export {
    filterDashoard,
    parseJson,
    CnvrtObjOfObjIntoArrOfObj,
    findOjectInArr,
    updateDeviceList,
}