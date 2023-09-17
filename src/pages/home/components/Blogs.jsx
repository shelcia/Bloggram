import React, { useEffect, useState } from "react";
import { apiBlog } from "../../../services/models/BlogModel";
// import { BlogCard, BlogList } from "../../../components/CustomBlogList";
import { Box, Skeleton, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BlogCard from "../../../components/CustomBlogCard";
import BlogList from "../../../components/CustomBlogList";

const Blogs = () => {
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
              <Box className="col-md-6">
                <Typography sx={{ mb: 2 }} variant="h6">
                  See what is trending <TrendingUpIcon /> !
                </Typography>
                <BlogCard blog={blogs?.[0]} />
              </Box>
              <Box className="col-md-6 pt-2">
                <BlogList blog={blogs?.[1]} />
                <BlogList blog={blogs?.[2]} />
              </Box>
            </Box>
          )
        )}
      </Box>
    </React.Fragment>
  );
};

export default Blogs;
