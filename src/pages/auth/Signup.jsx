import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAuth } from "../../services/models/AuthModel";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button, TextField, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthLayout from "../../layout/AuthLayout";
import { PREFIX } from "../../constants";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let userSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
    password: Yup.string().required("password is required"),
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = () => {
    setIsLoading(true);

    userSchema
      .validate(user)
      .then(() => {
        if (user.name) localStorage.setItem(`${PREFIX}Email`, user.email);

        const body = user;

        apiAuth.post(body, "register").then((res) => {
          setIsLoading(false);
          if (res.status === "200") {
            localStorage.setItem(`${PREFIX}Token`, res.token);
            localStorage.setItem(`${PREFIX}UserId`, res.userId);
            localStorage.setItem(`${PREFIX}name`, res.name);
            localStorage.setItem(`${PREFIX}uname`, res.uname);
            toast.success("Signup succesfull");
            navigate("/dashboard");
          } else {
            toast.error(res.message);
            localStorage.removeItem(`${PREFIX}Email`);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err.errors.toString());
      });
  };

  const matches = useMediaQuery("(min-width:600px)");

  return (
    <React.Fragment>
      <AuthLayout title="Signup">
        <TextField
          label="Name"
          variant="standard"
          sx={{ minWidth: matches ? 450 : 200 }}
          name="name"
          value={user.name}
          onChange={(e) => handleInputs(e)}
        />
        <br />
        <TextField
          label="Email"
          variant="standard"
          className="mt-4"
          sx={{ minWidth: matches ? 450 : 200 }}
          name="email"
          value={user.email}
          onChange={(e) => handleInputs(e)}
        />
        <br />
        <TextField
          label="Password"
          variant="standard"
          sx={{ minWidth: matches ? 450 : 200 }}
          className="mt-4"
          name="password"
          value={user.password}
          onChange={(e) => handleInputs(e)}
          type="password"
        />
        <div className="text-center mt-4">
          {isLoading ? (
            <LoadingButton
              loading
              loadingIndicator="Loading..."
              variant="outlined"
              size="small"
            >
              Loading
            </LoadingButton>
          ) : (
            <Button onClick={onSubmit} variant="outlined" size="small">
              Signup
            </Button>
          )}
        </div>
        <div className="text-center mt-5">
          Have an account already? then <Link to="/login">Login</Link>
        </div>
      </AuthLayout>
    </React.Fragment>
  );
};

export default Signup;
