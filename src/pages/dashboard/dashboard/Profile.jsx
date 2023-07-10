import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { apiUsers } from "../../../services/models/UserModel";
import { toast } from "react-hot-toast";
import { convertSimpleDate } from "../../../helpers/convertDate";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    date: "",
    email: "",
  });

  const _getProfile = (id, signal) => {
    apiUsers.getSingle(id, signal).then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();

    const userId = localStorage.getItem("BlogGram-UserId");

    _getProfile(userId, ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  const editProfile = () => {
    const userId = localStorage.getItem("BlogGram-UserId");

    const body = {
      name: user.name,
      // avatar: avatar,
    };
    apiUsers.put(body, `edit/${userId}`).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        toast.success(res.message);
        _getProfile(userId);
      } else {
        toast.error("Edit failed");
      }
    });
  };

  return (
    <section className="container pt-5">
      <Typography className="mb-4" component="h1" variant="h2">
        Edit Profile
      </Typography>
      <Box className="row">
        <Box className="col-md-6">
          <Card>
            <CardContent>
              <TextField
                label="Name*"
                variant="standard"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                fullWidth
                className="mb-4"
              />
              {/* <TextField
            label="Email"
            variant="standard"
            value={user.email}
            fullWidth
            disabled
            className="mb-4"
          /> */}
              {/* Joined {convertSimpleDate(user.date)} */}
              <Box className="mt-4">
                <Button variant="outlined" onClick={editProfile}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box className="col-md-6">
          <Card>
            <CardContent>
              <Typography className="mb-4" component="h2" variant="body1">
                <b>Email:</b> {user.email}
              </Typography>
              <Typography className="mb-4" component="h2" variant="body1">
                <b>Joined:</b> {convertSimpleDate(user.date)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </section>
  );
};

export default Profile;
