import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { apiBlog } from "../../../services/models/BlogModel";
import { TabContext, TabPanel } from "@mui/lab";
import { BlogList } from "../../common/BlogDisplay";

const MyBlogs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    const userId = localStorage.getItem("BlogGram-UserId");
    apiBlog.getSingle(userId, ac.signal, "myBlogs").then((res) => {
      console.log(res);
      if (res.status === "200") {
        setDrafts(res.message.filter((blog) => blog.type === "DRAFT"));
        setPublished(res.message.filter((blog) => blog.type !== "DRAFT"));
      }
    });

    return () => ac.abort();
  }, []);

  return (
    <React.Fragment>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            borderRadius: 0,
            paddingLeft: 0,
            marginBottom: 4,
          }}
        >
          <Tab label={"Drafts"} value="1" />
          <Tab label={"Published"} value="2" />
        </Tabs>
        <TabPanel value="1">
          {drafts.map((blog, index) => (
            <BlogList blog={blog} key={index} />
          ))}
        </TabPanel>
        <TabPanel value="2">
          {published.map((blog, index) => (
            <BlogList blog={blog} key={index} />
          ))}
        </TabPanel>
      </TabContext>
    </React.Fragment>
  );
};

export default MyBlogs;
