import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLogoutMutation } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const [logout, { client }] = useLogoutMutation();

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/bye">Bye</Link>
          <button
            onClick={async () => {
              await logout();
              localStorage.removeItem("accessToken");
              await client.resetStore();
            }}
          >
            logout
          </button>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
