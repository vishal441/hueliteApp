 import {createNewDevice} from '../../util/AppUtil';
 import {insertDevices, getDeviceListFromDb} from '../../database/table/DeviceTable';

 const getWebSocket = async (ipAddr,selectedDevice, deviceList, deviceListAction, wsHandler) =>{
    let wsUrl = `ws://${ipAddr}/ws`;
    let ws = await new WebSocket("ws://192.168.4.1/ws"),
        {BSSID, SSID} = selectedDevice;
    ws.onopen = (res)=>{
        ws.send("Connected");
        // wsHandler(ws);
        // return ws; 
    };
    
    ws.onerror = (e) => {
        console.log("Error: ",e.message);
    };

    ws.onmessage = (e)=>{
        console.log("Message: ",e.data);
        console.log("onmessage : selectedDevice", BSSID, SSID, deviceList);
        let IP;
        if(e.data.includes("192.168")){
            IP = e.data.substring(71,84);
            let newList = [],
            newDevice = createNewDevice('', BSSID, '', SSID, IP);
            newList.push(newDevice);
            insertDevices(newList);
            getDeviceListFromDb(newList => {
                console.log("condition success 12", newList);
                deviceListAction ? deviceListAction(newList) : null;
            });
                // updatedList = deviceList && deviceList.length ? [...deviceList] : [];
                // updatedList.push(newDevice);
                // deviceListAction ? deviceListAction(updatedList) : null;
            console.log("condition success 11", IP, newDevice, newList);
            

        };
        //console.log("IP: ",IP);

    };
    
    ws.onclose = (e)=>{
        console.log(e.code,"   baaki ka: ", e);
    };
    return ws;
}

export {getWebSocket}