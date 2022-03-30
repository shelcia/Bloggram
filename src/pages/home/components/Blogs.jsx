import React, { useEffect, useState } from "react";
import { apiBlog } from "../../../services/models/BlogModel";
import { BlogCard } from "../../common/BlogDisplay";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    apiBlog.getAll(ac.signal, "").then((res) => {
      setBlogs(
        res.message.sort((a, b) =>
          a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0
        )
      );
    });

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <section
        className="container px-5"
        id="blog-content"
        style={{ minHeight: "90vh" }}
      >
        <h1
          className="display-3 text mt-2 mb-5"
          style={{ fontWeight: 600 }}
          //   data-aos="fade-up"
        >
          Popular Blogs
        </h1>
        <div className="row mt-3">
          {blogs.map((blog, index) => (
            <div className="col-md-4" key={index}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Blogs;
