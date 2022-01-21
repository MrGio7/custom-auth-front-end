import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  useLoginMutation,
} from "../generated/graphql";
import { Box, TextField, Button } from "@mui/material";
import { validEmail, validPassword } from "../Regex";

interface Props {}

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, reset }] = useLoginMutation();
  const navigate = useNavigate();

  if (error) {
    alert(error.message);
    reset();
  }

  return (
    <Box
      id="login"
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

        const response = await login({
          variables: {
            email,
            password,
          },

          update: (store, { data }) => {
            if (!data) return null;
            store.writeQuery<LoggedInUserQuery>({
              query: LoggedInUserDocument,
              data: {
                loggedInUser: data.login.user,
              },
            });
          },
        });

        if (response && response.data) {
          localStorage.setItem("accessToken", response.data.login.accessToken);
          alert(`Welcome ${email}`);
          navigate("/counter");
        }
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
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button type="submit">Login</Button>
    </Box>
  );
};
