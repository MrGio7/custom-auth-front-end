import React from "react";
import { useByeQuery } from "../generated/graphql";

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { loading, data, error } = useByeQuery();

  if (loading) return <h1>LOADING///</h1>;
  if (error) {
    console.log(error);

    return <h1>ERROR///</h1>;
  }
  if (!data) return <h1>No Data</h1>;

  return <div>{JSON.stringify(data)}</div>;
};
