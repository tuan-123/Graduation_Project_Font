import {createNameEach} from "echarts/src/component/dataZoom/helper";

//const httpBaseUrl = 'http://127.0.0.1:8087';
const httpBaseUrl = 'http://192.168.43.143:8087';

//const webSocketUrl = 'ws://127.0.0.1:8087/webSocket/';
const webSocketUrl = 'ws://192.168.43.143:8087/webSocket/';


const footerCurrentClicked = 0;

const webSocket = null;
const webSocketTimeOutObj = null;
const webSocketServerTimeOutObj = null;
const webSocketTimeOut = 15000;
const lockReconnect = false;

export default {
  httpBaseUrl,
  footerCurrentClicked,
  webSocket,
  webSocketTimeOutObj,
  webSocketServerTimeOutObj,
  webSocketTimeOut,
  lockReconnect,
  webSocketUrl,
}
