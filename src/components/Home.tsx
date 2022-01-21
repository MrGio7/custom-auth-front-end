import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLoggedInUserQuery, useLogoutMutation } from "../generated/graphql";
import { Box, Button, ButtonGroup } from "@mui/material";
import { UserCount } from "./UserCount";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { loading, error } = useLoggedInUserQuery();
  const [logout, { client }] = useLogoutMutation();
  const navigate = useNavigate();

  if (loading) return <h1>Loading///</h1>;
  if (error)
    return (
      <>
        <header>
          <Box component="nav">
            <ButtonGroup size="large" fullWidth={true}>
              <Button onClick={() => navigate("/")}>Home</Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </ButtonGroup>
          </Box>
        </header>
        <UserCount />
        <Outlet />
      </>
    );

  return (
    <>
      <header>
        <Box component="nav">
          <ButtonGroup size="large" fullWidth={true}>
            <Button onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate("/counter")}>Counter</Button>
            <Button
              onClick={async () => {
                navigate("/");
                await logout();
                localStorage.removeItem("accessToken");
                await client.resetStore();
              }}
            >
              logout
            </Button>
          </ButtonGroup>
        </Box>
      </header>
      <UserCount />
      <Outlet />
    </>
  );
};
