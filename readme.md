# 💬 Zentra

[![Render Live](https://img.shields.io/badge/Live-Zentra-brightgreen?style=flat-square&logo=render)](https://zentra-wb93.onrender.com)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=flat-square)](https://zentra-backend-i9va.onrender.com)


Zentra is a real-time full-stack MERN chat application that allows users to engage in secure, interactive conversations with live **language translation** and **sentiment analysis**. Built with `Socket.IO`, it supports individual and group chats, typing indicators, and much more.

---

## 🚀 Features

- 🔒 JWT-based user authentication
- 💬 Real-time messaging with Socket.IO
- 🌍 Auto language translation for messages
- 😄 Sentiment analysis on chats
- 🧑‍🤝‍🧑 One-on-one & group chat support
- ✍️ Typing indicators
- 📜 Infinite scroll for message history
- 🧠 Context-aware backend handling with Express

---

## 🛠 Tech Stack

| Layer        | Technologies                           |
|--------------|----------------------------------------|
| Frontend     | React.js, Chakra UI, Axios, Socket.io-client |
| Backend      | Node.js, Express.js, MongoDB, Socket.io |
| Auth         | JWT, bcryptjs                          |
| Analysis     | Translation API, Sentiment API (planned) |
| Styling      | Chakra UI, FontAwesome, React Icons    |

---

## 📁 Project Structure

```
Zentra/
├── backend1/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
```

---

## 🌐 Live Links

- **Frontend:** [zentra-wb93.onrender.com](https://zentra-wb93.onrender.com)
- **Backend:** [zentra-backend-i9va.onrender.com](https://zentra-backend-i9va.onrender.com)

---

## 📦 Installation Guide

### Clone the repository

```bash
git clone https://github.com/ekta183/Zentra.git
cd Zentra
```

### Backend Setup

```bash
cd backend1
npm install
```

Create a `.env` file in `backend1/` with the following:

```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:3000,https://zentra-wb93.onrender.com
```

Start the backend server:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Backend `.env`:

```env
MONGO_URI=
JWT_SECRET=
PORT=
ALLOWED_ORIGINS=
```

---

## 📌 API Endpoints

### User Routes

- `POST /api/user` – Register
- `POST /api/user/login` – Login
- `GET /api/user` – Search Users (auth required)

### Chat Routes

- `POST /api/chat` – Access/Create Chat
- `GET /api/chat` – Fetch Chats
- `POST /api/chat/group` – Create Group
- `PUT /api/chat/rename` – Rename Group
- `PUT /api/chat/groupadd` – Add to Group
- `PUT /api/chat/groupremove` – Remove from Group

### Message Routes

- `GET /api/message/:chatId` – Get messages
- `POST /api/message` – Send a message

---

## 🧠 Socket.IO Events

- `setup` – On user connect
- `join chat` – Join specific chat room
- `typing` / `stop typing` – Typing indicators
- `new message` – Broadcast new messages
- `message received` – Send to all chat users

---

## 🚧 Future Enhancements

- 🌐 Multilingual Translation APIs (Google / LibreTranslate)
- 🔍 Message search & filters
- 📱 Mobile responsive layout improvements
- 🔔 Push notifications
- 📊 Dashboard for sentiment trends

---

## 👩‍💻 Author

**Ekta Jangir**  
📧 ekta210183@gmail.com  
🎓 B.Tech (2025)

---

## 📄 License

This project is licensed under the ISC License.
