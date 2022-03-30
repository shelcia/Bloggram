import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { TextField, Chip, Button } from "@mui/material";
import { apiBlog } from "../../../services/models/BlogModel";
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const BUTTONLIST = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["removeFormat"],
    "/",
    ["fontColor", "hiliteColor"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks" /*, 'codeView'*/],
    ["preview", "print"],
    // ["save", "template"],
  ];

  const handleChange = (content) => {
    // console.log(content); //Get Content Inside Editor
    setBlog({ ...blog, content: content });
  };

  const [blog, setBlog] = useState({
    title: "",
    desc: "",
    tags: [],
    content: [],
  });

  const handleInputs = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const createBlog = (type) => {
    const userId = localStorage.getItem("BlogGram-UserId");
    const body = {
      userId: userId,
      title: blog.title,
      desc: blog.desc,
      content: blog.content,
      likes: 0,
      comments: [],
      tags: blog.tags,
      type: type,
    };
    console.log(body);
    apiBlog.post(body).then((res) => {
      if (res.status === "200") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <section className="p-5">
      <div className="text-end">
        <Button
          onClick={() => createBlog("DRAFT")}
          variant="outlined"
          color="primary"
          size="small"
          className="me-2"
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => createBlog("PUBLISHED")}
          variant="outlined"
          color="success"
          size="small"
        >
          Publish
        </Button>
      </div>
      <TextField
        name="title"
        value={blog.title}
        onChange={handleInputs}
        label="Title"
        variant="standard"
        className="w-100"
      />
      <TextField
        name="desc"
        value={blog.desc}
        onChange={handleInputs}
        label="Description"
        variant="standard"
        className="w-100 my-3"
        multiline
        rows={4}
      />
      {blog.tags?.map((tag, index) => (
        <Chip
          label={tag}
          key={index}
          // onClick={handleClick}
          onDelete={() =>
            setBlog({ ...blog, tags: blog.tags.filter((item) => item !== tag) })
          }
        />
      ))}

      <TextField
        name="tags"
        label="tags"
        variant="standard"
        className="w-100 my-3"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setBlog({ ...blog, tags: [...blog.tags, e.target.value] });
          }
        }}
      />
      <SunEditor
        onChange={handleChange}
        setOptions={{
          height: "80vh",
          buttonList: BUTTONLIST,
        }}
      />
    </section>
  );
};

export default AddBlog;
