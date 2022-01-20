import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";

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
        });

        console.log(response);

        navigate("/")
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
