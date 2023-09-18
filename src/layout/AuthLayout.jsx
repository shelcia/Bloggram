import { Box, Card, CardContent } from "@mui/material";
import React from "react";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <React.Fragment>
      <Box className="container h-100 p-5 d-flex justify-content-center align-items-center">
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <h3 className="my-3 text-center">{title}</h3>
            {children}
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default AuthLayout;
