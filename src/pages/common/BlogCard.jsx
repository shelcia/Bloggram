import React from "react";
import Img from "../../assets/Bloggram.jpg";
import { Button, Card, CardContent, Typography } from "@mui/material";

const BlogCard = ({ blog }) => {
  return (
    <React.Fragment>
      <Card
        sx={{
          height: "500px",
          //   boxShadow: "0px 0px 21px 1px rgba(0, 0, 0, 0.03)",
          boxShadow: "16px 16px 32px #ededed, -16px -16px 32px #ffffff",
          border: "none",
        }}
      >
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

export default BlogCard;
