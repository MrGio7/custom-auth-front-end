import React from "react";
import { useLoggedInUserQuery } from "../generated/graphql";

interface Props {}

export const Counter: React.FC<Props> = () => {
  const { loading, data, error } = useLoggedInUserQuery();

  if (loading) return <h1>Loading///</h1>;
  if (error) return <h1>Coutner Error</h1>;

  return (
    <div>
      {data && data.loggedInUser && data.loggedInUser.logInCount === 1 ? (
        <p>Welcome {data.loggedInUser.email}</p>
      ) : (
        <p>
          Welcome It's your
          {data && data.loggedInUser ? data.loggedInUser.logInCount : null}th
          login
        </p>
      )}
    </div>
  );
};
