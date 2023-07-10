import React, { useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { apiBlog } from "../../../services/models/BlogModel";
import { TabContext, TabPanel } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { LoadDrafts, LoadPublished } from "../../../redux/actions";
import { BlogList } from "../../../components/CustomBlogDisplay";

const MyBlogs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   const [drafts, setDrafts] = useState([]);
  //   const [published, setPublished] = useState([]);

  const drafts = useSelector((state) => state.drafts);
  const published = useSelector((state) => state.published);

  const dispatch = useDispatch();

  useEffect(() => {
    const ac = new AbortController();
    const userId = localStorage.getItem("BlogGram-UserId");
    apiBlog.getSingle(userId, ac.signal, "myBlogs").then((res) => {
      // console.log(res);
      if (res.status === "200") {
        dispatch(
          LoadDrafts(res.message.filter((blog) => blog.type === "DRAFT"))
        );
        dispatch(
          LoadPublished(res.message.filter((blog) => blog.type !== "DRAFT"))
        );
      }
    });

    return () => ac.abort();
  }, [dispatch]);

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
