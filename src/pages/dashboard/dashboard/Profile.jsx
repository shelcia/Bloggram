import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { apiUsers } from "../../../services/models/UserModel";
import { convertSimpleDate } from "../../../helpers/convertDate";
import { PREFIX } from "../../../constants";
import DummyUser from "../../../assets/placeholders/dummy-user.png";
import { useDispatch, useSelector } from "react-redux";
import { apiBlog } from "../../../services/models/BlogModel";
import { LoadPublished } from "../../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { /*LOCALHOST_URL*/ CYCLIC_BASE_URL } from "../../../services/api";
import BlogList from "../../../components/CustomBlogList";

const Profile = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const [user, setUser] = useState({
    _id: "",
    name: "",
    desc: "",
    date: "",
    email: "",
  });

  const _getProfile = (id, signal) => {
    apiUsers.getSingle(id, signal, "by-uname").then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    // const userId = localStorage.getItem(`${PREFIX}UserId`);
    _getProfile(name, ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  const published = useSelector((state) => state.published);

  const dispatch = useDispatch();

  useEffect(() => {
    const ac = new AbortController();
    // const userId = localStorage.getItem(`${PREFIX}UserId`);
    apiBlog.getSingle(name, ac.signal, "by-uname-published").then((res) => {
      if (res.status === "200") {
        // console.log(res);
        dispatch(
          LoadPublished(res?.message?.filter((blog) => blog.type !== "DRAFT"))
        );
      }
    });

    return () => ac.abort();
  }, [dispatch]);

  return (
    <section className="container pt-5">
      <Box className="row">
        <Box className="col-md-4">
          <Card>
            <CardContent>
              <Box className="w-100 d-flex justify-content-center">
                <Avatar
                  src={`${CYCLIC_BASE_URL}/user/image/${user._id}`}
                  sx={{ width: 80, height: 80 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DummyUser;
                  }}
                />
              </Box>
              <Box className="d-flex flex-column" sx={{ gap: "0.5rem" }}>
                <Typography variant="h6">{user.name}</Typography>
                {user.desc && (
                  <Typography variant="subtitle1">{user.desc}</Typography>
                )}
                <Box className="d-flex justify-content-between">
                  <Typography variant="subtitle2" className="text-muted">
                    {user.email}
                  </Typography>
                  <Typography variant="subtitle2" className="text-muted">
                    {user.bio}
                  </Typography>
                  <Typography variant="subtitle2" className="text-muted">
                    Joined {convertSimpleDate(user.date)}
                  </Typography>
                </Box>

                {/* <Box className="d-flex justify-content-between">
                  <Typography variant="body2" sx={{ color: primary.main }}>
                    10 Followers
                  </Typography>
                  <Typography variant="body2" sx={{ color: primary.main }}>
                    10 Following
                  </Typography>
                </Box> */}

                <Typography variant="subtitle-2" className="text-muted">
                  {`Instagram: ${user.instagramHandle || 'No Instagram Handle Provided'}`}
                </Typography>
                <Typography variant="body2" className="text-muted">
                {user.bio ? (
                  <>
                    <strong>Instagram:</strong> {user.instagramHandle || 'No Instagram Handle Provided'} <br />
                    <strong>Bio:</strong> {user.bio}
                  </>
                ) : (
                  'No Bio Information Available'
                )}
              </Typography>


              </Box>
              {localStorage.getItem(`${PREFIX}Token`) && (
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/profile/${name}/edit`)}
                >
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>
        <Box className="col-md-8">
          {published.length !== 0 ? (
            published.map((blog, index) => <BlogList blog={blog} key={index} />)
          ) : (
            <Card>
              <CardContent>
                <Typography>No blogs published yet !</Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </section>
  );
};

export default Profile;
