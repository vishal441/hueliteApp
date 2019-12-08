 const getWebSocket = async (ipAddr, wsHandler) =>{
    let wsUrl = `ws://${ipAddr}/ws`;
    let ws = await new WebSocket("ws://192.168.4.1/ws");
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
    };
    
    ws.onclose = (e)=>{
        console.log(e.code,"   baaki ka: ", e);
    };
    return ws;
}

export {getWebSocket}