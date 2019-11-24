import {reduxConstant} from '../ReduxConstant'

const initialState = {
    deviceList: []
}

export const deviceReducer = (state = initialState, action) => {
    switch(action.type){
        case reduxConstant.DEVICE_LIST:
            return action.payload;
        default:
            return state;
    }
}