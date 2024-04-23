import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { SignIn } from "./components/CreateAccount";
import { LogIn } from "./components/Authentification";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<LogIn />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
