import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAuth } from "../../services/models/AuthModel";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Button,
  TextField,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthLayout from "../../layout/AuthLayout";
import { PREFIX } from "../../constants";
import Cookies from "js-cookie";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Signup = () => {
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let userSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z]+$/,
        "Please enter a valid name with only alphabetical characters"
      )
      .required("name is required"),
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be 8 characters or more, with at least one uppercase letter, one lowercase letter, and one digit"
      )
      .required("password is required"),
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
            Cookies.set(`${PREFIX}Token`, res.token, { expires: 6 / 24 });
            // localStorage.setItem(`${PREFIX}Token`, res.token);
            localStorage.setItem(`${PREFIX}UserId`, res.userId);
            localStorage.setItem(`${PREFIX}name`, res.name);
            localStorage.setItem(`${PREFIX}uname`, res.uname);
            toast.success("Signup succesfull");
            navigate("/dashboard");
            location.reload();
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
          type={`${isPasswordVisible ? "text": "password" }`}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setisPasswordVisible(!isPasswordVisible)}
                  edge="end"
                >
                  {isPasswordVisible ? (
                    <VisibilityIcon style={{ color: '#4CAAF1' }} />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
