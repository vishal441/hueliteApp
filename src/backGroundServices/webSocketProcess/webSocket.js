 const getWebSocket = async (ipAddr, wsHandler, OnMessageRecieved) => {
    let wsUrl = `ws://${ipAddr}/ws`;
    let ws = await new WebSocket(wsUrl);
    console.log("WSURL 0:   ",wsUrl)
    ws.onopen = (res)=>{
       if(res && ws && ws.send){
        ws.send("Connected");
        wsHandler(ws);
       }
    };
    
    ws.onerror = (e) => {
        console.log("Error: ",e.message);
        OnMessageRecieved(e, null);
    };

    ws.onmessage = (e) => {
        console.log("Message: ",e.data);
        OnMessageRecieved(e, ws);
    };
    
    ws.onclose = (e) => {
        console.log("Close: ", e);
        OnMessageRecieved(e, null);
    };
    return ws;
}

export {getWebSocket}