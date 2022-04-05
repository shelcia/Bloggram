import { Popover } from "@mui/material";
import React from "react";

const CustomPopover = ({ children, setAnchorEl, anchorEl }) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          minWidth: 160,
          maxWidth: 230 || 375,
          width: "100%",
          padding: "0.5rem 0",
        },
      }}
    >
      <div>{children}</div>
    </Popover>
  );
};

export default CustomPopover;
