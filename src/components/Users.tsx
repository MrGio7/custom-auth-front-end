import { Box, List, ListItem, Typography } from "@mui/material";
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
    <Box sx={{width: 'max-content'}}>
      <Typography sx={{ mt: "20px" }} variant="h4">
        User List
      </Typography>
      <List>
        {data &&
          data.users.map((user) => {
            return (
              <ListItem key={user.id} sx={{ m: 0 }}>
                {user.email}
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};
