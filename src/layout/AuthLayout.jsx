import { Box, Card, CardContent } from "@mui/material";
import React from "react";
import AuthTopbar from "./AuthTopbar";
import Footer from "../common/Footer";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <React.Fragment>
      <AuthTopbar />
      <Box className="container h-100 p-5 d-flex justify-content-center align-items-center">
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <h3 className="my-3 text-center">{title}</h3>
            {children}
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default AuthLayout;
