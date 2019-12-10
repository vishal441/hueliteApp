import {authoriseApi} from './webApi/WebApi';
import {getWebSocket} from './webSocketProcess/webSocket';
 
const connectToDevice = async (ipAddr, wsHandler) =>{
    let authoriseResponse = await authoriseApi(ipAddr),
    webSocket;

    if(authoriseResponse.includes("Authorized")){
        webSocket = await getWebSocket(ipAddr, wsHandler);
    }
    if(webSocket){
        return webSocket;
    }
    else{
        return false;
    }
}

export {connectToDevice}