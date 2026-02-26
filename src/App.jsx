import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
