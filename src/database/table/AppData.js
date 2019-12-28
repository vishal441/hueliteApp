import { getDeviceListFromDb } from './DeviceTable'
import { getDashoardList } from './DashboardTable';
import { getUserInfoFromDb } from './UserInfoTable';
import { filterDashoard, findOjectInArr } from '../../util/AppUtil';
import { dashboardArr } from '../../util/DummyData';

export const getAppData = async () => {
    let userRes = await getUserInfoFromDb(),
        res = {};
    if (userRes) {
        res = userRes;
    }
    let devices = await getDeviceListFromDb(),
        dashList = await getDashoardList();
    dashList && dashList.forEach(ele => {
        let dashArr = [], deviceObj = null;
        ele.Device_List && ele.Device_List.forEach(deviceIdObj => {
            deviceObj = findOjectInArr(devices, "Mac", deviceIdObj.Device_Id);
            if (deviceObj) {
                dashArr.push(deviceObj);
            }
        })
        res[`${ele.Type_Name}`] = dashArr;
    });

    res["All_Device_List"] = devices;
    return res;
}