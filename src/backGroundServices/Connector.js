import {authoriseApi} from './webApi/WebApi';
import {getWebSocket} from './webSocketProcess/webSocket';
 
const connectToDevice = async (ipAddr) =>{
    let authoriseResponse = await authoriseApi(ipAddr),
    webSocket;

    console.log("authoriseResponse: ",authoriseResponse);
    if(authoriseResponse.includes("Authorized")){
        webSocket = await getWebSocket(ipAddr);
    }
    if(webSocket){
        return webSocket;
    }
    else{
        return false;
    }
}

export {connectToDevice}