import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import { SignIn } from "./components/SignIn.jsx";
import { LogIn } from "./components/LogIn.jsx";
import { Home } from "./components/Home.jsx";
import { ChatRoom } from "./components/ChatRoom.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="chat/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
