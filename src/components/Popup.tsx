import React, { useState } from "react";
import { Alert } from "@mui/material";

interface Props {
  visible: boolean;
}

export const Popup: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(props.visible);

  if (!visible) return null;

  return (
    <Alert
      sx={{ position: "sticky", bottom: 0 }}
      onClose={() => setVisible(false)}
    >
      You're lucky person :)
    </Alert>
  );
};
