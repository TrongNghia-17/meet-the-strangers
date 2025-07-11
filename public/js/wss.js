import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTCHandler from "./webRTCHandler.js";

let socketIO = null;

export const registerSocketEnvents = (socket) => {
    socketIO = socket;

    socket.on("connect", () => {
        console.log("successfully connected to socket.io server");
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
    });

    socket.on("pre-offer", (data) => {
        webRTCHandler.handlePreOffer(data);
    });
}

export const sendPreOffer = (data) => {
    console.log("emmiting to server pre offer event");
    socketIO.emit("pre-offer", data);
};
