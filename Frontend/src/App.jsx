import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/Signup";
function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#000814] font-inter">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
