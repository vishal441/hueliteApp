const Realm = require('realm');

export const DeviceSchema = {
    name: 'Device',
    primaryKey: 'Mac',
    properties: {
        Mac: {type: 'string', default: ''},
        Host_Name: {type: 'string', default: ''},
        SSID: {type: 'string', default: ''},
        IP_Address: {type: 'string', default: ''},
        Last_WS_Msg_Sent_Time_Stamp: {type: 'int', default: 0},
        Last_WS_Msg_Received_Time_Stamp: {type: 'int', default: 0},
        Last_Heart_Time_Stamp: {type: 'int', default: 0},
        Connected: {type: 'bool', default: false},
        Last_State: {type: 'string', default: ''}
    }
};

export const TutorialSchema = {
    name: 'Tutorial',
    properties: {
        Tutorial_1 : {type: 'bool', default: false},
        Tutorial_2 : {type: 'bool', default: false},
    }
}

// export const UserInfoSchema = {
//     name: 'UserInfo',
//     properties: {
//         User_Id : {type: 'bool', default: false},
//         Device_Id : {type: 'bool', default: false},
//     }
// }



export const dataOptions = {
    path: 'Huelite_App.realm',
    schema: [DeviceSchema, TutorialSchema],
    schemaVersion: 4,
};

export default new Realm(dataOptions);
      
      