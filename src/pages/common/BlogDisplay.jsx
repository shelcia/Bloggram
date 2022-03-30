import React from "react";
import Img from "../../assets/Bloggram.jpg";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <React.Fragment>
      <Card sx={{ height: "500px" }}>
        <img
          src={blog.image ? blog.image : Img}
          alt=""
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <CardContent className="mt-3">
          <Typography variant="h5" className="my-3">
            {blog?.title}
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 400 }}>
            {blog?.desc}
          </Typography>
          <Button variant="outlined" size="small">
            Read More
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const BlogList = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Card
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid rgb(148, 164, 196)",
          width: "100%",
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        onClick={() => navigate(`/blog/${blog._id}`)}
      >
        <CardContent className="mt-3 d-flex align-items-center">
          <img
            src={blog.image ? blog.image : Img}
            alt=""
            style={{ width: 100, height: 100, objectFit: "cover" }}
            className="me-4"
          />
          <div>
            <Typography variant="h5" className="my-3">
              {blog?.title}
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              {blog?.desc}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export { BlogCard, BlogList };
