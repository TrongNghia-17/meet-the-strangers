import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constansts from "./constants.js";

// initialization of socketIO connection
const socket = io("/");
wss.registerSocketEnvents(socket);

// register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById("personal_code_copy_button");
personalCodeCopyButton.addEventListener("click", () => {
    const personalCode = store.getState().socketId;
    navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// register event listener for connection buttons
const personalCodeChatButton = document.getElementById("personal_code_chat_button");

const personalCodeVideoButton = document.getElementById("personal_code_video_button");

personalCodeChatButton.addEventListener("click", () => {
    console.log("chat button clicked");

    const calleePersonalCode = document.getElementById("personal_code_input").value;
    const callType = constansts.callType.CHAT_PERSONAL_CODE;

    webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

personalCodeVideoButton.addEventListener("click", () => {
    console.log("video button clicked");

    const calleePersonalCode = document.getElementById("personal_code_input").value;
    const callType = constansts.callType.VIDEO_PERSONAL_CODE_PERSONAL_CODE;

    webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});