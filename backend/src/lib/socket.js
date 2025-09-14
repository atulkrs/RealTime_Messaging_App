
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const userSocketMap = {}; 

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("✅ Socket connected:", socket.id, " userId:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`📌 Mapped user ${userId} -> socket ${socket.id}`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("👥 Current online users:", Object.keys(userSocketMap));

  // Listen for a "sendMessage" event from the client
  socket.on("sendMessage", (messageData) => {
    console.log("📥 Received sendMessage event:", messageData);

    const { senderId, receiverId, text } = messageData;
    const msg = {
      ...messageData,
      createdAt: new Date().toISOString(),
      _id: `msg-${Date.now()}`,
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", msg);
      console.log(`📤 Sent message to receiver ${receiverId} at socket ${receiverSocketId}`);
    } else {
      console.log(`⚠️ Receiver ${receiverId} not connected, cannot send directly`);
    }

  
    socket.emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);

   
    for (const id in userSocketMap) {
      if (userSocketMap[id] === socket.id) {
        delete userSocketMap[id];
        console.log(`🗑️ Removed mapping for user ${id}`);
        break;
      }
    }

    console.log("👥 After disconnect, online:", Object.keys(userSocketMap));
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
