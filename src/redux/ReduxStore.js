import {createStore} from 'redux';
import {deviceReducer} from './reducers/DeviceListReducer'

export const store = createStore(deviceReducer);