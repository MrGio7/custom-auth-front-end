import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  useLoginMutation,
} from "../generated/graphql";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

interface Props {}

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
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

        console.log(response);

        if (response && response.data) {
          localStorage.setItem("accessToken", response.data.login.accessToken);
        }

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
      <Button type="submit">Login</Button>
    </Box>
  );
};
