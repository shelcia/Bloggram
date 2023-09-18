import React from "react";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const CustomLikeComponent = ({
  id,
  likedBlogs,
  handleLike,
  _getUser = () => {},
}) => {
  console.log(_getUser());
  return likedBlogs?.map((blog) => blog.blogId).includes(id.toString()) ? (
    <IconButton
      aria-label="like"
      color="error"
      onClick={() => handleLike(id, _getUser())}
    >
      <FavoriteIcon />
    </IconButton>
  ) : (
    <IconButton aria-label="like" onClick={() => handleLike(id, _getUser())}>
      <FavoriteBorderIcon />
    </IconButton>
  );
};

export const CustomShareComponent = ({
  id,
  savedBlog,
  handleLike,
  _getUser,
}) => {
  return savedBlog?.map((blog) => blog.blogId).includes(id.toString()) ? (
    <IconButton
      aria-label="like"
      color="secondary"
      onClick={() => handleLike(id, _getUser)}
    >
      <BookmarkIcon />
    </IconButton>
  ) : (
    <IconButton aria-label="like" onClick={() => handleLike(id, _getUser)}>
      <BookmarkBorderIcon />
    </IconButton>
  );
};
