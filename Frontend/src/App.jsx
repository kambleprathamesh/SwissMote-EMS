import { Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./Pages/AuthContext";
import Feeds from "./Pages/Feeds";
import Error from "./Pages/Error";
import AddEvents from "./Pages/AddEvents";
// import Dashboard from "./Pages/Dashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  console.log(auth);
  return auth?.token ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#000814] font-inter">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Feeds />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/add-event" element={<AddEvents />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
