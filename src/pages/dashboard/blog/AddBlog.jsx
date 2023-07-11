import React, { useState } from "react";
import { apiBlog } from "../../../services/models/BlogModel";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BlogSections from "../components/BlogSections";
import { PREFIX } from "../../../constants";

const AddBlog = () => {
  const [file, setFile] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    desc: "",
    tags: [],
    content: [],
  });

  // console.log({ file });

  const handleChange = (content) => {
    // console.log(content); //Get Content Inside Editor
    setBlog({ ...blog, content: content });
  };

  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const createBlog = (type) => {
    if (blog.type === "PUBLISHED") {
      if (blog.title === "") {
        toast.error("Fill in the title");
        return;
      }
      if (blog.desc === "") {
        toast.error("Fill in the Description");
        return;
      }
      if (blog.content === "") {
        toast.error("Fill in the Content");
        return;
      }
      if (blog?.tags?.length === 0) {
        toast.error("Fill in the tags");
        return;
      }
    }

    setLoading(true);
    const userId = localStorage.getItem(`${PREFIX}UserId`);
    const uname = localStorage.getItem(`${PREFIX}uname`);

    let formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("userId", userId);
    formData.append("uname", uname);
    formData.append("title", blog.title);
    formData.append("desc", blog.desc);
    formData.append("content", blog.content);
    formData.append("tags", JSON.stringify(blog.tags));
    formData.append("type", type);

    apiBlog.postFormData(formData).then((res) => {
      if (res.status === "200") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
    setLoading(false);

    navigate("/dashboard");
  };

  return (
    <>
      <BlogSections
        blog={blog}
        setBlog={setBlog}
        file={file}
        setFile={setFile}
        handleInputs={handleInputs}
        handleChange={handleChange}
        loading={loading}
        handleBlog={createBlog}
      />
    </>
  );
};

export default AddBlog;
