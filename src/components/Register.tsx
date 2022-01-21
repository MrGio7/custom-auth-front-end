import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";
import { validEmail, validPassword } from "../Regex";

interface Props {}

export const Register: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { error, reset }] = useRegisterMutation();
  const navigate = useNavigate();

  if (error) {
    alert(error.message);
    reset();
  }

  return (
    <Box
      id="register"
      component="form"
      onSubmit={async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!validEmail.test(email)) {
          alert("Please enter valid email");
          return;
        }
        if (!validPassword.test(password)) {
          alert("Please enter valid password");
          return;
        }

        await register({
          variables: {
            email,
            password,
          },
        });

        alert("Registration was successful, please login");
        navigate("/login");
      }}
    >
      <TextField
        sx={{
          width: "100%",
        }}
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
          width: "100%",
          mt: "20px",
        }}
        label="Password"
        helperText="Passwords must be at least 6 characters long and must contain at least one number."
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
