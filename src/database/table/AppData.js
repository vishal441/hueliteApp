import {getDeviceListFromDb} from './DeviceTable' 
import {getDashoardList} from './DashboardTable';
import {getUserInfoFromDb} from './UserInfoTable';
import {filterDashoard, findOjectInArr} from '../../util/AppUtil';
import { dashboardArr } from '../../util/DummyData';

export const getAppData = (callback) => {
    getUserInfoFromDb(userRes => {
        let res = {};
        if(userRes){
            res = userRes;
        }
        getDeviceListFromDb(deviceList => {
            let devices = deviceList;
             getDashoardList(dashList => {
                dashList && dashList.forEach(ele => {
                    let dashArr = [], deviceObj = null;
                    ele.Device_List && ele.Device_List.forEach(deviceIdObj => {
                        deviceObj = findOjectInArr(devices,"Mac", deviceIdObj.Device_Id);
                        if(deviceObj){
                            dashArr.push(deviceObj);
                        }
                    })
                    res[`${ele.Type_Name}`] = dashArr;
                });
            })
            res["All_Device_List"] = devices;
            callback(res) ;
        })
       
    })
}