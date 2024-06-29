const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Địa chỉ client của bạn
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId && user.socketId === socketId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUsers = (userId) => {
  return users.filter((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const users = getUsers(receiverId);
    users.forEach((user) => {
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  });
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);

const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log("Server running on port :" + port);
});
