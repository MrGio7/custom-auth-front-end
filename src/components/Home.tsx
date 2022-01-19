import React from "react";
import { Link, Outlet } from "react-router-dom";

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
