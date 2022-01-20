import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLoggedInUserQuery, useLogoutMutation } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = useLoggedInUserQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.loggedInUser) {
    body = <div>you are logged in as: {data.loggedInUser.email}</div>;
  } else {
    body = <div>please log in</div>;
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/bye">Bye</Link>
          {!loading && data && data.loggedInUser ? (
            <button
              onClick={async () => {
                await logout();
                localStorage.removeItem("accessToken");
                await client.resetStore();
              }}
            >
              logout
            </button>
          ) : null}
        </nav>
        {body}
      </header>
      <Outlet />
    </>
  );
};
