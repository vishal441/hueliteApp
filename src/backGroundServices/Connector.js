import {authoriseApi} from './webApi/WebApi';
import {getWebSocket} from './webSocketProcess/webSocket';
 
const connectToDevice = async (ipAddr, wsHandler, response) =>{
    let authoriseResponse = await authoriseApi(ipAddr),
    webSocket;

    if(authoriseResponse && authoriseResponse.includes("Authorized")){
        webSocket = await getWebSocket(ipAddr, wsHandler, response);
    }
    if(webSocket){
        return webSocket;
    }
    else{
        return false;
    }
}

export {connectToDevice}