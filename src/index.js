import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./config/ProtectedRoute";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./css/index.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
