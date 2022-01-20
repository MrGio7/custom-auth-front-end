import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Bye } from "./components/Bye";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Users } from "./components/Users";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (response) => {
      const { accessToken } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>LOADING///</h1>;
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Users />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="bye" element={<Bye />} />
      </Route>
    </Routes>
  );
}
