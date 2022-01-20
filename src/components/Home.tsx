import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLoggedInUserQuery, useLogoutMutation } from "../generated/graphql";
import { Box, Button, ButtonGroup } from "@mui/material";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading, error } = useLoggedInUserQuery();
  const [logout, { client }] = useLogoutMutation();
  const navigate = useNavigate();

  if (loading) return <h1>Loading///</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <header>
        <Box component="nav">
          <ButtonGroup size="large" fullWidth={true}>
            <Button onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate("/register")}>Register</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/bye")}>Bye</Button>
            {!loading && data && data.loggedInUser ? (
              <Button
                sx={{ color: "black" }}
                onClick={async () => {
                  await logout();
                  localStorage.removeItem("accessToken");
                  await client.resetStore();
                }}
              >
                logout
              </Button>
            ) : null}
          </ButtonGroup>
        </Box>
        {data && data.loggedInUser ? (
          <div>you are logged in as: {data.loggedInUser.email}</div>
        ) : (
          <div>please log in</div>
        )}
      </header>
      <Outlet />
    </>
  );
};
