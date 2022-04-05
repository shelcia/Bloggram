import * as React from "react";
import { apiBlog } from "../services/models/BlogModel";
import { Link } from "react-router-dom";
import { Box, TextField, Autocomplete } from "@mui/material";

export default function Asynchronous() {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const ac = new AbortController();

    if (blogs.length !== 0) {
      return;
    }

    apiBlog.getAll(ac.signal, "").then((res) => {
      setBlogs(res.message);
    });

    return () => {
      ac.abort();
    };
  }, [blogs]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={blogs}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search any blog"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          variant="standard"
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option._id}>
          <Link to={`/blog/${option._id}`} className="w-100 h-100">
            {option.title}
          </Link>
        </Box>
      )}
    />
  );
}
