const Realm = require("realm");

export const DeviceIdSchema = {
  name: "DeviceId",
  primaryKey: "Device_Id",
  properties: {
    Device_Id: { type: "string", default: "" }
  }
};

export const DashboardTypeSchema = {
  name: "DashboardType",
  primaryKey: "Dashboard_Id",
  properties: {
    Dashboard_Id: { type: "string", default: "" },
    Type_Name: { type: "string", default: "" },
    Device_List: { type: "list", objectType: "DeviceId" }
  }
};

export const DeviceSchema = {
  name: "Device",
  primaryKey: "Mac",
  properties: {
    Type: { type: "string", default: "Device" },
    Mac: { type: "string", default: "" },
    Host_Name: { type: "string", default: "" },
    HOST: { type: "string", default: "" },
    SSID: { type: "string", default: "" },
    IP_Address: { type: "string", default: "" },
    Last_WS_Msg_Sent_Time_Stamp: { type: "int", default: 0 },
    Last_WS_Msg_Received_Time_Stamp: { type: "int", default: 0 },
    Last_Heart_Time_Stamp: { type: "int", default: 0 },
    Connected: { type: "bool", default: false },
    Last_State: { type: "string", default: "#00ffff" },
    Save_State: { type: "bool", default: true },
    Web_Socket: { type: "string", default: "" },
    Intensity: { type: "int", default: 0 },
    HSV: "HSV"
  }
};

export const HSVSchema = {
  name: "HSV",
  properties: {
    h: { type: "int", default: 120 },
    s: { type: "int", default: 80 },
    v: { type: "int", default: 80 }
  }
};

export const TutorialSchema = {
  name: "Tutorial",
  properties: {
    Tutorial_1: { type: "bool", default: false },
    Tutorial_2: { type: "bool", default: false }
  }
};

export const UserInfoSchema = {
  name: "UserInfo",
  primaryKey: "User_Id",
  properties: {
    User_Id: { type: "string", default: "user_id" },
    Email_Id: { type: "string", default: "" },
    Phone_Version: { type: "string", default: "" },
    Device_Id: { type: "string", default: "" }
  }
};

//TODO: export n use next 2 schema
export const TimerSchema = {
  name: "Timer",
  primaryKey: "ID",
  properties: {
    ID: { type: "int", default: 0 },
    Time: { type: "int", default: 0 },
    AM: { type: "bool", default: true },
    Once: { type: "bool", default: true },
    MON: { type: "bool", default: false },
    TUE: { type: "bool", default: false },
    WED: { type: "bool", default: false },
    THU: { type: "bool", default: false },
    FRI: { type: "bool", default: false },
    SAT: { type: "bool", default: false },
    SUN: { type: "bool", default: false }
  }
};

export const GroupSchema = {
  name: "GroupInfo",
  primaryKey: "Name",
  properties: {
    Name: { type: "string", default: "Group-1" },
    Type: { type: "string", default: "" },
    Devices: "device[]"
  }
};

export const dataOptions = {
  path: "Huelite_App.realm",
  schema: [
    DeviceSchema,
    TutorialSchema,
    UserInfoSchema,
    DeviceIdSchema,
    DashboardTypeSchema,
    HSVSchema
  ],
  schemaVersion: 28
};

export default new Realm(dataOptions);
