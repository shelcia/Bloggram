import React, { useState } from "react";
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
  const [isLiked, setIsLiked] = useState(
    likedBlogs?.map((blog) => blog.blogId).includes(id.toString())
  );

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    handleLike(id, _getUser());
  };

  return (
    <IconButton
      aria-label="like"
      onClick={handleLikeClick}
      color={isLiked ? "error" : "default"}
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export const CustomShareComponent = ({
  id,
  savedBlog,
  handleSave,
  _getUser = () => {},
}) => {
  const [isSaved, setIsSaved] = useState(
    savedBlog?.map((blog) => blog.blogId).includes(id.toString())
  );

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    handleSave(id, _getUser());
  };

  return (
    <IconButton
      aria-label="save"
      onClick={handleSaveClick}
      color={isSaved ? "primary" : "default"}
    >
      {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
  );
};
