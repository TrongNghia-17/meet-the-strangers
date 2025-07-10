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

io.on("connection", (socket) => {
    console.log("user connected to socket.IO server");
    console.log(socket.id);
});

server.listen(POST, () => {
    console.log(`listening on ${POST}`);
});