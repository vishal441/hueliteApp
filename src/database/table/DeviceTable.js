
import {DeviceSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertDevices = (deviceArr) => {
    insertOrUpdateQuery(DeviceSchema.name,deviceArr, cb => {
        console.log("insertOrUpdateQuery : ", cb);
   });
  
}

export const getDeviceListFromDb = async(callback) => {
    let deviceRes = await getQuery(DeviceSchema.name,false);
    return deviceRes;
}

export const deleteDeviceTable = () => {
    deleteSchema([DeviceSchema.name], cb => {

    });
}