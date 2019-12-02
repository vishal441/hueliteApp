import {reduxConstant} from '../ReduxConstant';
import {currentTimeStamp} from '../../util/AppUtil';

const initialState = {
    deviceList: []
}

export const deviceReducer = (state = initialState, action) => {
    switch(action.type){
        case reduxConstant.DEVICE_LIST :
            return action.deviceList;
        
        case reduxConstant.UPDATE_LAST_STATE : 
            let {Mac, lastColor} = action.payload,
            updatedList = updateDeviceObj(lastColor, Mac, state);
            return updatedList;

        default:
            return state;
    }
}

const updateDeviceObj = (lastState, mac, deviceArr) => {
    let updatedList = [];
    if(deviceArr.length){
        for(let i = 0; i < deviceArr.length; i++){
            if(deviceArr[i].Mac === mac){
                deviceArr[i].Last_State = lastState;
                deviceArr[i].Last_WS_Msg_Sent_Time_Stamp = currentTimeStamp();
                updatedList.push(deviceArr[i]);
            }
            else{
                updatedList.push(deviceArr[i]);
            }
        }
    }
    return updatedList;
}