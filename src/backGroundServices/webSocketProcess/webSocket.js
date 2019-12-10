 const getWebSocket = async (ipAddr, wsHandler) =>{
    let wsUrl = `ws://${ipAddr}/ws`;
    let ws = await new WebSocket(wsUrl);
    ws.onopen = (res)=>{
        ws.send("Connected");
        wsHandler(ws);
        // return ws; 
    };
    
    ws.onerror = (e) => {
        console.log("Error: ",e.message);
    };

    ws.onmessage = (e)=>{
        console.log("Message: ",e.data);
    };
    
    ws.onclose = (e)=>{
        console.log("Close: ", e);
    };
    return ws;
}

export {getWebSocket}