import "./App.css";
import { Routes, Route } from "react-router";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/chats" element={<Chatpage />} />
      </Routes>

      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
