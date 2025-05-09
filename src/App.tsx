import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  useEffect(() => {
    invoke("init");
  }, []);

  return (
    <main className="block border-1 border-neutral-600 rounded-lg h-[400px] w-[350px]">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
