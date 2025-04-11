import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/chats" element={<Chatpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
