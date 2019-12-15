
import Realm from 'realm';
import {dataOptions} from '../Schema';
import {DashboardTypeSchema, DeviceIdSchema} from '../Schema';
import { getQuery, deleteSchema} from '../DbAction';
import {CnvrtObjOfObjIntoArrOfObj} from '../../util/AppUtil';
import _ from 'underscore';

export const insertDashboard = (dashboardArr) => {

    insertDashoardAndDeviceIds(dashboardArr, cb => {
        
    })
}

const insertDashoardAndDeviceIds = (dashboardArr,callback) => {
    let dbResponse = {}
    Realm.open(dataOptions).then( realm => {
        try {
            dashboardArr.forEach( (dashboardObj) => {
                realm.write(() =>{
                    realm.create(DashboardTypeSchema.name, dashboardObj, true);
                    dashboardObj.Device_List && dashboardObj.Device_List.forEach(deviceObj => {
                        realm.create(DeviceIdSchema.name, deviceObj, true);
                    })
                })
            });
            dbResponse.success = true;
            callback(dbResponse);
        }
        catch (e) {
            dbResponse.error = e;
            dbResponse.success = false;
            callback(dbResponse);
        }
    })
}

export const getDashoardList = async() => {
    let dbRes = await getQuery(DashboardTypeSchema.name,false),
       {data, success} = dbRes, 
        res = [];
        if(success){
            data && data.length && data.forEach(item => {
               let dashObj = _.clone(item);
               dashObj.Device_List = CnvrtObjOfObjIntoArrOfObj(item.Device_List);
               res.push(dashObj);
            })
        }
    return res;
}

export const deleteDashboard = () => {
    deleteSchema([DashboardTypeSchema.name, DeviceIdSchema.name], cb => {
        
    });
}
