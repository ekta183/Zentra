const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS policy: Not allowed by CORS"));
      }
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
];
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params);
  const singlechat = chats.find((c) => c._id === req.params.id);
  res.send(singlechat);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
