import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface Props {}

export const Users: React.FC<Props> = () => {
  const { loading, data, error } = useUsersQuery({
    fetchPolicy: "network-only",
  });

  if (loading) return <h1>LOADING///</h1>;
  if (error) return <h1>ERROR///</h1>;

  return (
    <ul>
      {data?.users.map((user) => {
        return (
          <li key={user.id}>
            {user.email}, {user.id}
          </li>
        );
      })}
    </ul>
  );
};
