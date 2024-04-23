import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import { SignIn } from "./components/SignIn";
import { LogIn } from "./components/LogIn";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
