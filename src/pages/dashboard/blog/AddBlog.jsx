import React, { useState } from "react";
import { TextField, Chip, Button, IconButton, Input } from "@mui/material";
import { apiBlog } from "../../../services/models/BlogModel";
import { toast } from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CustomEditor from "../../../components/CustomEditor";

const AddBlog = () => {
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState([]);
  const [page, setPage] = useState(1);
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

  return (
    <>
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

              {page === 1 ? (
                <Button
                  onClick={() => setPage(2)}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Go to Publish
                </Button>
              ) : (
                <Button
                  onClick={() => createBlog("PUBLISHED")}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Publish
                </Button>
              )}
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

        {page === 1 ? (
          <>
            <TextField
              name="title"
              value={blog.title}
              onChange={handleInputs}
              label="Title*"
              variant="standard"
              className="w-100 mb-4"
            />
            <CustomEditor handleChange={handleChange} />
          </>
        ) : (
          <>
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
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    label="Tags*"
                    variant="standard"
                    className="w-100 my-3"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setBlog({
                          ...blog,
                          tags: [...blog.tags, e.target.value],
                        });
                        setTag("");
                      }
                    }}
                  />
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
          </>
        )}
      </section>
    </>
  );
};

export default AddBlog;
