const Realm = require('realm');

export const DeviceIdSchema = {
    name: 'DeviceId',
    primaryKey: 'Device_Id',
    properties: {
        Device_Id: {type: 'string', default: ''},
    }
}

export const DashboardTypeSchema = {
    name: 'DashboardType',
    primaryKey: 'Dashboard_Id',
    properties: {
        Dashboard_Id: {type: 'string', default:''},
        Type_Name: {type:'string', default:''},
        Device_List: {type: 'list', objectType: 'DeviceId'},
    }
}

export const DeviceSchema = {
    name: 'Device',
    primaryKey: 'Mac',
    properties: {
        Type: {type:'string', default:'Device'},
        Mac: {type: 'string', default: ''},
        Host_Name: {type: 'string', default: ''},
        SSID: {type: 'string', default: ''},
        IP_Address: {type: 'string', default: ''},
        Last_WS_Msg_Sent_Time_Stamp: {type: 'int', default: 0},
        Last_WS_Msg_Received_Time_Stamp: {type: 'int', default: 0},
        Last_Heart_Time_Stamp: {type: 'int', default: 0},
        Connected: {type: 'bool', default: false},
        Last_State: {type: 'string', default: ''},
    }
};

export const TutorialSchema = {
    name: 'Tutorial',
    properties: {
        Tutorial_1 : {type: 'bool', default: false},
        Tutorial_2 : {type: 'bool', default: false},
    }
}

export const UserInfoSchema = {
    name: 'UserInfo',
    primaryKey: 'User_Id',
    properties: {
        User_Id : {type: 'string', default: ""},
        Email_Id : {type: 'string', default: ""},
        Phone_Version : {type: 'string', default: ""},
        Device_Id : {type: 'string', default: ""},
    }
}



export const dataOptions = {
    path: 'Huelite_App.realm',
    schema: [DeviceSchema, TutorialSchema, UserInfoSchema, DeviceIdSchema, DashboardTypeSchema],
    schemaVersion: 12,
};

export default new Realm(dataOptions);
      
      