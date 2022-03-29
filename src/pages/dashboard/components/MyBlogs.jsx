import { Tab, Tabs } from "@mui/material";
import React from "react";

const MyBlogs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        // centered
        style={{
          //   backgroundColor: "#F9F9F9",
          //   border: "1px solid #E5EAF2",
          borderRadius: 8,
          paddingLeft: 5,
        }}
      >
        <Tab label={"Drafts"} key={"Drafts"} />
        <Tab label={"Published"} key={"Published"} />
      </Tabs>
    </React.Fragment>
  );
};

export default MyBlogs;
