const express = require("express");
const http = require("http");

const POST = process.env.POST || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
    connectedPeers.push(socket.id);
    console.log(connectedPeers);

    socket.on("pre-offer", (data) => {
        console.log("pre-offer-came");
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");

        const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
            peerSocketId !== socket.id;
        });

        connectedPeers = newConnectedPeers;
        console.log(connectedPeers);
    });
});

server.listen(POST, () => {
    console.log(`listening on ${POST}`);
});