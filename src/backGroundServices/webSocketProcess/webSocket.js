 const getWebSocket = async (ipAddr, wsHandler, response) =>{
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
        console.log("Message: ", e.data);
        response  && response(e, ws);
    };
    
    ws.onclose = (e)=>{
        console.log("Close: ", e);
    };
    return ws;
}

export {getWebSocket}