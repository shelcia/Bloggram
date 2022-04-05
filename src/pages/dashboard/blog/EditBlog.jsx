import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { TextField, Chip, Button, IconButton, Input } from "@mui/material";
import { apiBlog } from "../../../services/models/BlogModel";
import { toast } from "react-hot-toast";
import { BlogShapes } from "../../../components/Shapes";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Loading from "../../common/LoadingPage";

const EditBlog = () => {
  const BUTTONLIST = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["removeFormat"],
    // "/",
    ["fontColor", "hiliteColor"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks" /*, 'codeView'*/],
    ["preview", "print"],
    // ["save", "template"],
  ];

  const [file, setFile] = useState(null);

  // console.log({ file });

  const handleChange = (content) => {
    // console.log(content); //Get Content Inside Editor
    setBlog({ ...blog, content: content });
  };

  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    desc: "",
    tags: [],
    content: [],
  });

  const handleInputs = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const createBlog = (type) => {
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
    if (blog.tags === []) {
      toast.error("Fill in the tags");
      return;
    }

    setLoading(true);
    const userId = localStorage.getItem("BlogGram-UserId");

    let formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("userId", userId);
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

    navigate("/dashboard/home");
  };

  const [pageLoading, setPageLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const ac = new AbortController();
    apiBlog.getSingle(id, ac.signal).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        setBlog(res.message);
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
      <BlogShapes />
      <section className="p-5">
        <div className="d-flex justify-content-between">
          <div>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ fontSize: "0.9rem" }} />
            </IconButton>
            <span className="mb-0" style={{ fontSize: "0.9rem" }}>
              Go Back
            </span>
          </div>
          {!loading ? (
            <div>
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
                variant="contained"
                color="secondary"
                size="small"
              >
                Publish
              </Button>
            </div>
          ) : (
            <>
              <LoadingButton
                loading
                loadingIndicator="Loading..."
                variant="outlined"
              >
                Loading
              </LoadingButton>
            </>
          )}
        </div>
        <div className="text-center">
          {file ? (
            <>
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="img-fluid"
              />
              <br />
              <Button
                variant="outlined"
                component="span"
                onClick={() => setFile(null)}
              >
                Clear Image
              </Button>
            </>
          ) : (
            <>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/png, image/jpeg"
                  id="contained-button-file"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button variant="outlined" component="span">
                  <ImageOutlinedIcon
                    className="me-2"
                    sx={{ fontSize: "1rem" }}
                  />
                  Upload Image
                </Button>
              </label>
            </>
          )}
        </div>
        <TextField
          name="title"
          value={blog.title}
          onChange={handleInputs}
          label="Title*"
          variant="standard"
          className="w-100"
        />
        <TextField
          name="desc"
          value={blog.desc}
          onChange={handleInputs}
          label="Description*"
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
              setBlog({
                ...blog,
                tags: blog.tags.filter((item) => item !== tag),
              })
            }
          />
        ))}

        <TextField
          name="tags"
          label="Tags*"
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
    </>
  );
};

export default EditBlog;
