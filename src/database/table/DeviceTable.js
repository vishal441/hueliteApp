
import {DeviceSchema} from '../Schema';
import {insertOrUpdateQuery, getQuery, deleteSchema} from '../DbAction';

export const insertDevices = (deviceArr) => {
    insertOrUpdateQuery(DeviceSchema.name,deviceArr, cb => {

   });
  
}

export const getDeviceListFromDb = async(callback) => {
    getQuery(DeviceSchema.name,false, cb => {
        if(cb.success){
             callback (cb.data);
        }
        else {
            callback ([]);
        }
    })
}

export const deleteDeviceTable = () => {
    deleteSchema([DeviceSchema.name], cb => {

    });
}