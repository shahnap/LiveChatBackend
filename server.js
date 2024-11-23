const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all origins

const server = http.createServer(app);
io = new Server(server, {
  cors: {
    origin: "https://live-chat-ipd5.vercel.app", // Allow Vercel frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], // Allow content-type header
    credentials: true, // Allow cookies if needed
  },
});



io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Handle the incoming message
  socket.on("message", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    // Emit the message to all connected clients
    io.emit("message", { id: socket.id, text: msg });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000; // Use the environment's port or fallback to 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

