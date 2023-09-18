import React from "react";
import { Box, styled } from "@mui/material";

const Small = ({
  children,
  className,
  ellipsis,
  // textTransform,
  italic = false,
  ...props
}) => {
  return (
    <StyledBox
      // textTransformStyle={textTransform}
      ellipsis={ellipsis}
      className={className}
      style={{ fontStyle: italic ? "italic" : "normal" }}
      component="small"
      fontSize="14px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ textTransformStyle, ellipsis }) => ({
  textTransform: textTransformStyle || "none",
  whiteSpace: ellipsis ? "nowrap" : "normal",
  overflow: ellipsis ? "hidden" : "",
  textOverflow: ellipsis ? "ellipsis" : "",
}));

const CustomMenuList = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
  },
}));

export default CustomMenuList;
