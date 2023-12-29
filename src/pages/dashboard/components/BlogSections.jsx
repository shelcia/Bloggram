import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Input, TextField, useMediaQuery } from "@mui/material";
import CustomEditor from "../../../components/CustomEditor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";
import { CustomSelectChipField } from "../../../components/CustomInputs";

const BlogSections = ({
  blog,
  setBlog,
  file,
  setFile,
  handleInputs,
  defaultValue = "",
  handleChange,
  loading,
  handleBlog,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const hasBlogContent = blog.title && blog.content.length && blog.desc && blog.tags.length;
  const matches = useMediaQuery("(max-width:500px)");
  return (
    <section className="p-sm-5 p-3">
      <Box className="d-flex justify-content-between align-items-center">
        <Box>
          <Button 
          onClick={page === 1 ? () => navigate(-1) : () => setPage(1)}
          className="px-sm-4 px-2 border"
          >
            <ArrowBackIcon sx={{ fontSize: "0.9rem" }} />
            <span className="mb-0">Go Back</span>
          </Button>
        </Box>
        {!loading ? (
          <Box sx={{ display: matches ? 'flex' : '' }}>
          
            <Button
              onClick={() => handleBlog("DRAFT")}
              variant="outlined"
              color="primary"
              size="small"
              className="px-sm-4 px-2 me-2"
              disabled={!hasBlogContent}
            >
              Save as Draft
            </Button>

            {page === 1 ? (
              <Button
                onClick={() => setPage(2)}
                variant="contained"
                color="secondary"
                className="px-sm-4 px-2"
                size="small"
              >
                Go to Publish
              </Button>
            ) : (
              <Button
                onClick={() => handleBlog("PUBLISHED")}
                variant="contained"
                color="secondary"
                className="px-sm-4 px-3"
                size="small"
              >
                Publish
              </Button>
            )}
          </Box>
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
      </Box>

      {page === 1 ? (
        <>
          <Input
            placeholder="Title goes here !"
            className="w-100 mb-4 mt-2 blog-title"
            sx={{
              fontSize: 28,
              fontWeight: 700,
              "::before": {
                border: "none",
              },
              ":hover": {
                border: "none",
              },
              ":after": {
                border: "none",
              },
            }}
            name="title"
            value={blog.title}
            onChange={handleInputs}
          />
          <CustomEditor
            handleChange={handleChange}
            defaultValue={defaultValue}
          />
        </>
      ) : (
        <>
          <Box className="text-center">
            <TextField
              name="desc"
              value={blog.desc}
              onChange={handleInputs}
              label="Description*"
              variant="standard"
              className="w-100 my-3"
              multiline
              rows={3}
            />

            <CustomSelectChipField
              name="tags"
              label="Tags"
              placeholder="what do you want"
              val={blog}
              setVal={setBlog}
            />
            <Box className="row">
              <Box className="col-md-6">
                {file ? (
                  <>
                    {typeof file === "string" ? (
                      <img
                        src={file}
                        alt=""
                        className="img-fluid"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="img-fluid"
                        loading="lazy"
                      />
                    )}
                    <br />
                  </>
                ) : (
                  <>
                    <p> No Background image added !</p>
                  </>
                )}
              </Box>
              <Box className="col-md-6 d-flex justify-content-center align-items-center flex-row">
                {file ? (
                  <>
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
                        Upload Image*
                      </Button>
                    </label>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </section>
  );
};

export default BlogSections;
