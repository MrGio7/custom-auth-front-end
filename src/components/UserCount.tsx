import React from "react";
import {
  useNewUserSubSubscription,
  useUserCountQuery,
} from "../generated/graphql";
import { Popup } from "./Popup";

interface Props {}

export const UserCount: React.FC<Props> = () => {
  const { data: dataSub } = useNewUserSubSubscription();
  const {
    loading: userCountLoading,
    data: userCountData,
    error: userCountError,
  } = useUserCountQuery();

  if (userCountLoading) return <h1>LOADING</h1>;
  if (userCountError) return <h1>ERROR</h1>;
  if (dataSub)
    return (
      <>
        <h1>There are {dataSub && dataSub.newUser} users registred</h1>
        <Popup
          visible={
            dataSub && dataSub.newUser && dataSub.newUser > 3 ? true : false
          }
        />
      </>
    );

  return (
    <>
      <h1>
        There are {userCountData && userCountData.userCount} users registred
      </h1>
      <Popup
        visible={
          userCountData &&
          userCountData.userCount &&
          userCountData.userCount > 3
            ? true
            : false
        }
      />
    </>
  );
};
