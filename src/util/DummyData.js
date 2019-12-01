let dashoarTye1 = {Bedroom:{Type_Name: "Bedroom"}},
dashoarTye2 = {Bedroom:{Type_Name: "Bedroom"}, Kitchen:{Type_Name: "Kitchen"}};
export const deviceArr = [
    {
        Type: "Device",
        Mac: "DC:4F:22:5F:65:76",
        Host_Name: "",
        SSID: "Homelink1",
        IP_Address: "192.168.1.70",
        Last_WS_Msg_Sent_Time_Stamp: 0,
        Last_WS_Msg_Received_Time_Stam: 0,
        Last_Heart_Time_Stamp: 0,
        Connected: false,
        Last_State: "",
    },
    {
        Type: "Device",
        Mac: "2C:F4:32:57:74:00",
        Host_Name: "",
        SSID: "Homelink1",
        IP_Address: "192.168.1.71",
        Last_WS_Msg_Sent_Time_Stamp: 0,
        Last_WS_Msg_Received_Time_Stam: 0,
        Last_Heart_Time_Stamp: 0,
        Connected: false,
        Last_State: "",
    },
    {
        Type: "Device",
        Mac: "DC:4F:22:5F:63:EC",
        Host_Name: "",
        SSID: "Homelink1",
        IP_Address: "192.168.1.72",
        Last_WS_Msg_Sent_Time_Stamp: 0,
        Last_WS_Msg_Received_Time_Stam: 0,
        Last_Heart_Time_Stamp: 0,
        Connected: false,
        Last_State: "",
    }
]

export const userInfo = [ 
    {
        User_Id : 'test@123',
        Email_Id : "test@gmail.com",
        Phone_Version : "pie",
        Device_Id : "718@jhf8833"
    }
]

export const dashboardArr = [
    { 
        Dashboard_Id: "1",
        Type_Name: "Bedroom" , 
        Device_List : 
        [
            { Device_Id: "DC:4F:22:5F:65:76" }
        ]
    },
    { 
        Dashboard_Id: "2",
        Type_Name: "Kitchen" , 
        Device_List: 
        [
            {Device_Id: "2C:F4:32:57:74:00"},
            {Device_Id: "DC:4F:22:5F:63:EC"},
        ] 
    },
]


