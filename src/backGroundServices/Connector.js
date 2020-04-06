import { AuthAPI } from "./webApi/WebApi";
import { getWebSocket } from "./webSocketProcess/webSocket";

const connectToDevice = async (ipAddr, wsHandler, OnMessageRecieved, wsErr) => {
  let debug = false;
  AuthAPI((IPAddress = ipAddr))
    .then(async response => {
      {
        debug && console.log(response.body);
      }
      let webSocket = await getWebSocket(
        ipAddr,
        wsHandler,
        OnMessageRecieved,
        wsErr
      );
      if (webSocket) return webSocket;
      else return false;
    })
    .catch(err => {
      {
        debug && console.log(err);
      }
      return false;
    });
};

export { connectToDevice };
