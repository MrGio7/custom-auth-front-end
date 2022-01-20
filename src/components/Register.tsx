import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation, useUsersQuery } from "../generated/graphql";

interface Props {}

export const Register: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation({refetchQueries: [useUsersQuery]});
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        m: "30px auto",
      }}
      component="form"
      onSubmit={async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const response = await register({
          variables: {
            email,
            password,
          },
        });

        console.log(response);

        navigate("/");
      }}
    >
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        sx={{
          mt: "20px",
        }}
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button type="submit">Register</Button>
    </Box>
  );
};
