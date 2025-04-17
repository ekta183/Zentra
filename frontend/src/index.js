import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "./components/ui/provider";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom"; // 🧠 Add this line

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* 🧠 Wrap everything inside this */}
      <Provider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
