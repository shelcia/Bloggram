import React, { useEffect, useState } from "react";
import { apiBlog } from "../../../services/models/BlogModel";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/LoadingPage";
import BlogSections from "../components/BlogSections";
import { LOCALHOST_URL } from "../../../services/api";
import { PREFIX } from "../../../constants";

const EditBlog = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    desc: "",
    tags: [],
    content: [],
  });
  const [file, setFile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // handling the editor changes
  const handleChange = (content) => {
    // console.log(content); //Get Content Inside Editor
    setBlog({ ...blog, content: content });
  };
  // handling the textfield changes
  const handleInputs = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const editBlog = (type) => {
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

    let formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("userId", userId);
    formData.append("title", blog.title);
    formData.append("desc", blog.desc);
    formData.append("content", blog.content);
    if (blog.tags.length !== 0) {
      formData.append("tags", JSON.stringify(blog.tags));
    }
    formData.append("type", type);

    apiBlog.putFormData(formData, `blog/${blog._id}`).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
    setLoading(false);

    navigate("/dashboard");
  };

  useEffect(() => {
    const ac = new AbortController();
    apiBlog.getSingle(id, ac.signal).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        setBlog(res.message);
        // console.log(res.message);
        setFile(`${LOCALHOST_URL}/blog/image/${res.message._id}`);
        setPageLoading(false);
      } else {
        setPageLoading(false);
      }
    });

    return () => {
      ac.abort();
    };
  }, [id]);

  return pageLoading ? (
    <Loading />
  ) : (
    <>
      <BlogSections
        blog={blog}
        setBlog={setBlog}
        file={file}
        setFile={setFile}
        handleInputs={handleInputs}
        defaultValue={blog.content}
        handleChange={handleChange}
        loading={loading}
        handleBlog={editBlog}
      />
    </>
  );
};

export default EditBlog;
