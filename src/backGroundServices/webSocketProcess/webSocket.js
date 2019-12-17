 const getWebSocket = async (ipAddr, wsHandler, OnMessageRecieved) =>{
    let wsUrl = `ws://${ipAddr}/ws`;
    let ws = await new WebSocket(wsUrl);
    ws.onopen = (res)=>{
       if(res && ws && ws.send){
        ws.send("Connected");
        wsHandler(ws);
       }
        // return ws; 
    };
    
    ws.onerror = (e) => {
        console.log("Error: ",e.message);
        wsHandler(null);
    };

    ws.onmessage = (e)=>{
        console.log("Message: ",e.data);
        OnMessageRecieved(e.data);
    };
    
    ws.onclose = (e)=>{
        console.log("Close: ", e);
        wsHandler(null);
    };
    return ws;
}

export {getWebSocket}