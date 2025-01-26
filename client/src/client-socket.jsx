<script  src="/socket.io/socket.io.js"></script>
import { post } from "./utilities.js";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});