import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  useLoginMutation,
} from "../generated/graphql";

interface Props {}

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
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
      <input
        value={email}
        type="email"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
};
