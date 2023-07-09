import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAuth } from "../../services/models/AuthModel";
import toast from "react-hot-toast";
import { Button, TextField, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthLayout from "../../layout/AuthLayout";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "BlogGram-";

  const navigate = useNavigate();

  const onSubmit = (event) => {
    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email);
    // event.preventDefault();

    const body = {
      name: name,
      email: email,
      password: password,
    };

    // console.log(body);

    apiAuth.post(body, "register").then((res) => {
      // console.log(res);
      setIsLoading(false);

      if (res.status === "200") {
        localStorage.setItem(`${PREFIX}Token`, res.token);
        localStorage.setItem(`${PREFIX}UserId`, res.userId);
        localStorage.setItem(`${PREFIX}name`, res.name);
        // sucessNotify("Login succesfulll");
        toast.success("Signup succesfull");
        navigate("/dashboard/home");
      } else {
        toast.error(res.message);
        localStorage.removeItem(`${PREFIX}Email`);
      }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          label="Email"
          variant="standard"
          className="mt-4"
          sx={{ minWidth: matches ? 450 : 200 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          variant="standard"
          sx={{ minWidth: matches ? 450 : 200 }}
          className="mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
