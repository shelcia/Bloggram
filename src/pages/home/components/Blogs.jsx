import React, { useEffect, useState } from "react";
import { apiBlog } from "../../../services/models/BlogModel";
import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BlogCard from "../../../components/CustomBlogCard";
import BlogList from "../../../components/CustomBlogList";
import { apiUsers } from "../../../services/models/UserModel";
import { PREFIX } from "../../../constants";

const Blogs = () => {
  const matches = useMediaQuery("(max-width:600px)");

  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    apiBlog.getSingle("featuredposts", ac.signal, "").then((res) => {
      // console.log(res);
      setBlogs(
        res.message.sort((a, b) =>
          a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0
        )
      );
      setIsLoading(false);
    });

    return () => {
      ac.abort();
    };
  }, []);

  const [user, setUser] = useState({
    name: "",
    date: "",
    likedBlogs: [],
    savedBlogs: [],
  });

  const _getUser = (id, signal) => {
    apiUsers.getSingle(id, signal, `details`).then((res) => {
      console.log(res.message);
      if (res.status === "200") {
        setUser(res.message);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    const userId = localStorage.getItem(`${PREFIX}UserId`);
    _getUser(userId, ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <Box className="container" id="blog-content">
        {isLoading ? (
          <Box className="row mt-3 mb-3">
            <Box className="col-md-6">
              <Skeleton variant="rectangular" width={"auto"} height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
            <Box className="col-md-6">
              <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton variant="rectangular" width={"50%"} height={100} />
                <Box sx={{ width: "50%" }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Skeleton variant="rectangular" width={"50%"} height={100} />
                <Box sx={{ width: "50%" }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          blogs.length !== 0 &&
          blogs && (
            <Box className="row mt-3">
              <Box className="col-lg-6" sx={{ mb: { xs: 5 } }}>
                <Typography sx={{ mb: 2 }} variant="h6">
                  See what is trending <TrendingUpIcon /> !
                </Typography>
                <BlogCard
                  blog={blogs?.[0]}
                  likedBlogs={user?.likedBlogs}
                  savedBlogs={user?.savedBlogs}
                  getCurrUser={() => _getUser()}
                />
              </Box>
              <Box className="col-lg-6 pt-2">
                {matches ? (
                  <BlogCard
                    blog={blogs?.[1]}
                    likedBlogs={user?.likedBlogs}
                    savedBlogs={user?.savedBlogs}
                    getCurrUser={() => _getUser()}
                  />
                ) : (
                  <BlogList
                    blog={blogs?.[1]}
                    likedBlogs={user?.likedBlogs}
                    savedBlogs={user?.savedBlogs}
                    getCurrUser={() => _getUser()}
                  />
                )}
                {matches ? (
                  <BlogCard
                    blog={blogs?.[2]}
                    likedBlogs={user?.likedBlogs}
                    savedBlogs={user?.savedBlogs}
                    getCurrUser={() => _getUser()}
                  />
                ) : (
                  <BlogList
                    blog={blogs?.[2]}
                    likedBlogs={user?.likedBlogs}
                    savedBlogs={user?.savedBlogs}
                    getCurrUser={() => _getUser()}
                  />
                )}
              </Box>
            </Box>
          )
        )}
      </Box>
    </React.Fragment>
  );
};

export default Blogs;
